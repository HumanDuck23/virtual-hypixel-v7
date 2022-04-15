import * as fs from "fs"

const express = require("express")
const axios = require("axios")

const app = express()
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

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})