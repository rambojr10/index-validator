import dotenv from "dotenv"
dotenv.config()

import express from "express"
import morgan from "morgan"
import { fileURLToPath } from "url"
import { dirname, resolve } from "path"

import loginRouter from "./src/routes/login.js"
import indexRouter from "./src/routes/indexValidator.js"

const { PORT } = process.env
const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()

app.use(morgan('dev'))
// app.use(express.static(resolve(__dirname, "dist")))

app.use(loginRouter)
app.use(indexRouter)

app.listen(PORT, () => {`Server is running on port ${PORT}!`})