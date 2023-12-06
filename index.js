import express from "express";
import { promises as fs } from 'fs'
import deliveryRouter from "./routes/delivery.routes.js"

const { readFile } = fs

global.fileName = "pedidos.json"

const app = express()

app.use(express.json())

app.use("/delivery", deliveryRouter)

app.listen(3000, async () => {
    try {
        await readFile(fileName)
        console.log("API Started!")
    } catch (err) {
        console.log(err)
    }
}
)