import openai from "./openApiConecction.js"
import getDataIndexValidator from "./getDataIndexValidator.js"
import { INDEX_VALIDATOR } from "./prompts.js"

const { SYSTEM_MESSAGE, EXAMPLES_MESSAGES } = INDEX_VALIDATOR

async function getResultIndexValidator(props) {
    
    console.log('Generating...')

    const { code, tags, message } = await getDataIndexValidator(props)

    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        temperature: 0.1,
        messages: [
            {
                role: SYSTEM_MESSAGE.role,
                content: SYSTEM_MESSAGE.content
            },
            ...EXAMPLES_MESSAGES,
            {
                role: 'user',
                content: `[START] {"code":${code}, "tags":${tags}} [END]`,
            }
        ]
    })

    console.log('Data generated.')
    if (message) {
        return message
    }
    return response.data.choices[0]?.message?.content
}

export default getResultIndexValidator

// console.log(response.data.choices[0]?.message?.content)

// const prompt = `${SYSTEM_MESSAGE.content} { code: ${code}, tags: ${tags} }`
// const response = await openai.createCompletion({
//     model: 'text-davinci-003',
//     prompt: prompt,
//     temperature: 0,
//     max_tokens: 2500,
// })
// console.log(response.data.choices[0]?.text)