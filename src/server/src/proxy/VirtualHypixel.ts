import { VirtualHypixelConfig } from "./interfaces/VirtualHypixelConfig"
import { ModuleInterface } from "./interfaces/modules/ModuleInterface"
import { InstantConnectProxy } from "prismarine-proxy"
import { Client } from "minecraft-protocol"
import { Logger } from "./utils/Logger"

import  { EventEmitter } from "events"
import * as fs from "fs"
import * as path from "path"

/**
 * Main Virtual Hypixel Class
 */
export class VirtualHypixel extends EventEmitter {

    version = "v7-1.0-beta"
    config: VirtualHypixelConfig | null = null

    // proxy related
    proxy: InstantConnectProxy | null = null
    client: Client | null = null
    packetsStarted: boolean = false

    // modules
    modules: ModuleInterface[] = []

    constructor() {
        super()
    }


    start(config: VirtualHypixelConfig) {
        this.config = config

        Logger.startup(`Starting Virtual Hypixel ${this.version}...`)

        this.proxy = new InstantConnectProxy({
            loginHandler: (client: Client) => {
                this.client = client

                Logger.info(`Logging in as ${this.client.profile.name}...`)

                let credentials = null
                if (this.config?.settings) {
                    for (const account of this.config.settings.accounts) {
                        if (account.username === this.client.profile.name) {
                            credentials = account
                            break
                        }
                    }
                }

                if (credentials) {
                    return {
                        username: credentials.email,
                        password: credentials.password,
                        auth: "microsoft"
                    }
                } else {
                    if (this.config?.settings) {
                        setTimeout(() => {
                            this.client?.end("§cNo credentials were found for this account!")
                        }, 1000)
                        return {
                            username: this.config.settings.accounts[0].email,
                            password: this.config.settings.accounts[0].password,
                            auth: "microsoft"
                        }
                    } else {
                        return {username: "", password: "", auth: "mojang"} // this will crash but then oh well no accounts added
                    }
                }
            },
            serverOptions: {
                version: "1.8.9",
                validateChannelProtocol: false,
                motd: this.config.serverConfig.motd,
                maxPlayers: this.config.serverConfig.maxPlayers,
                favicon: this.config.serverConfig.favicon,
                port: this.config.serverConfig.port
            },
            clientOptions: {
                version: "1.8.9",
                host: "hypixel.net"
            }
        })

        // @ts-ignore
        this.proxy.on("incoming", (data, meta, toClient, toServer) => {
            try {
                toClient.write(meta.name, data)
            } catch (e) {
                Logger.error(`Error while writing to client: ${e}`)
            }
        })

        // @ts-ignore
        this.proxy.on("outgoing", (data, meta, toClient, toServer) => {
            try {
                toServer.write(meta.name, data)
            } catch (e) {
                Logger.error(`Error while writing to server: ${e}`)
            }
        })

        Logger.info(`Virtual Hypixel ${this.version} started!`)
        this.emit("started")
    }

    stop() {
        Logger.info(`Stopping Virtual Hypixel ${this.version}...`)
        this.proxy?.server?.close()
        this.proxy = null
    }

    loadModules() {
        Logger.info(`Loading modules...`)
        this.modules = []
        const moduleFolder = this.config?.settings.modules.path
        if (moduleFolder) {
            const modules = fs.readdirSync(moduleFolder)
            for (const module of modules) {
                // make sure this is a module folder
                if (fs.lstatSync(path.join(moduleFolder, module)).isDirectory()) {
                    try {
                        const moduleManifest = JSON.parse(fs.readFileSync(path.join(moduleFolder, module, "manifest.json")).toString())
                        const moduleConfig = JSON.parse(fs.readFileSync(path.join(moduleFolder, module, "config.json")).toString())
                        const classPath = path.join(moduleFolder, module, "index.js")
                        Logger.info(`Loading class ${classPath}...`)
                        const moduleClass = require(classPath)
                        this.modules.push({
                            manifest: moduleManifest,
                            config: moduleConfig,
                            instance: new moduleClass(this.config?.moduleConfigs[moduleManifest.id])
                        })
                        Logger.info(`Loaded module ${moduleManifest.name}`)
                    } catch (e) {
                        Logger.error(`Error while loading module ${module}: ${e}`)
                        console.log(e)
                    }
                }
            }
        }
    }

}