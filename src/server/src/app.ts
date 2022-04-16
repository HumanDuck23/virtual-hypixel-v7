const fs = require("fs")
const path = require("path")

const express = require("express")
const app = express()

const axios = require("axios")
const http = require("http")
const server = http.createServer(app)
const { Server } = require("socket.io")
const io = new Server(server, { cors: { origin: "http://localhost:3000" } })

const { VirtualHypixel } = require("./proxy/VirtualHypixel")
const vh = new VirtualHypixel()

const port = 6969

app.use(function (req: any, res: any, next: any) {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000")
    next()
})

app.get("/randomDuck", (req: any, res: any) => {
    axios.get("https://random-d.uk/api/v2/randomimg?type=jpg", {responseType: "arraybuffer"})
        .then((result: any) => {
            const img = Buffer.from(result.data, "binary").toString("base64")
            const imgString = `data:image/jpeg;base64,${img}`
            res.send(imgString)
        })
        .catch((err: any) => {
            console.error(err)
        })
})

io.on("connection", (socket: any) => {
    console.log("connected")
    socket.on("disconnect", () => {
        console.log("disconnected")
    })

    socket.on("startProxy", (config: any) => {
        // Start the proxy here
        vh.on("started", () => {
            socket.emit("proxyStarted")
            vh.loadModules()
        })
        vh.start(config)
    })

    socket.on("stopProxy", () => {
        vh.stop()
    })

    socket.on("getModules", (path_: string) => {
        if (fs.existsSync(path_)) {
            const dir = fs.readdirSync(path_)
            const list = []
            for (const module of dir) {
                const m = {
                    manifest: {},
                    config: {}
                }
                const moduleManifest = JSON.parse(fs.readFileSync(path.join(path_, module, "manifest.json")).toString())
                const moduleConfig = JSON.parse(fs.readFileSync(path.join(path_, module, "config.json")).toString())
                m.manifest = moduleManifest
                m.config = moduleConfig
                list.push(m)
            }
            socket.emit("moduleResponse", list)
        } else {
            socket.emit("moduleResponse", false)
        }
    })
})

server.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})