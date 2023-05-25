import openai from "./openApiConecction.js"
import getDataIndexValidator from "./getDataIndexValidator.js"
import { INDEX_VALIDATOR } from "./prompts.js"

const { SYSTEM_MESSAGE, EXAMPLES_MESSAGES } = INDEX_VALIDATOR

const { code, tags } = await getDataIndexValidator({
    email: "andres.valencia@talent.com",
    password: "Valencia10.",
    scanid: "209762"
})

const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    temperature: 0.2,
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
console.log(response.data.choices[0]?.message?.content)

// const prompt = `${SYSTEM_MESSAGE.content} { code: ${code}, tags: ${tags} }`
// const response = await openai.createCompletion({
//     model: 'text-davinci-003',
//     prompt: prompt,
//     temperature: 0,
//     max_tokens: 2000,
//     examples: [
//         [EXAMPLES_MESSAGES[0].content, EXAMPLES_MESSAGES[1].content],
//         // ["input2", "output2"]
//     ]
// })
// console.log(response.data.choices[0]?.text)