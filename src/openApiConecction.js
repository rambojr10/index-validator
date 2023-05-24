import { Configuration, OpenAIApi } from "openai"

const configuration = new Configuration({
    apiKey: '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',
})
const openai = new OpenAIApi(configuration)
// const { data } = await openai.listModels()
// console.log(JSON.stringify(data, null, 2))

export default openai