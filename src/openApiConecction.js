import { Configuration, OpenAIApi } from "openai"

const configuration = new Configuration({
    apiKey: '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',
})
const openai = new OpenAIApi(configuration)

export default openai