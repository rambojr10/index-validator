import dotenv from "dotenv"
dotenv.config()

import { Configuration, OpenAIApi } from "openai"

const { OPEN_AI_API_KEY } = process.env

const configuration = new Configuration({
    apiKey: OPEN_AI_API_KEY,
})
const openai = new OpenAIApi(configuration)

export default openai