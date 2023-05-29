import express from "express"
import morgan from "morgan"
import defaultConfigs from "./src/configs.js"
import { fileURLToPath } from "url"
import { dirname } from "path"
import { resolve } from "path"
import loginRouter from "./src/routes/login.js"

const { PORT } = defaultConfigs
const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()

app.use(morgan('dev'))
// app.use(express.static(resolve(__dirname, "dist")))

app.use(loginRouter)

app.listen(PORT, () => {`Server is running on port ${PORT}!`})