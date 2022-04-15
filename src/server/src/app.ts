const express = require("express")
const app = express()

const axios = require("axios")
const http = require("http")
const server = http.createServer(app)
const { Server } = require("socket.io")
const io = new Server(server, { cors: { origin: "http://localhost:3000" } })

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
    })
})

server.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})