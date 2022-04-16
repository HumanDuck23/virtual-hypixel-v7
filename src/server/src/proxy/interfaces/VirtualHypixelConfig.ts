export interface VirtualHypixelConfig {
    serverConfig: {
        favicon: string,
        motd: string,
        maxPlayers: number,
        port: number
    },

    settings: {
        accounts: {
            username: string,
            email: string,
            password: string
        }[],
        modules: {
            path: string
        }
    },

    moduleConfigs: {
        [key: string]: {
            [key: string]: any
        }
    }
}