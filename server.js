import express from "express"
import morgan from "morgan"
import defaultConfigs from "./src/configs.js"

const { __dirname, PORT } = defaultConfigs
const app = express()

app.use(morgan('dev'))
app.use(express.static(__dirname, "dist"))

app.listen(PORT, () => {`Server is running on port ${PORT}!`})