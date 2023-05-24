import openai from "./openApiConecction.js"
import getDataIndexValidator from "./getDataIndexValidator.js"
import { INDEX_VALIDATOR } from "./prompts.js"

const { SYSTEM_MESSAGE, EXAMPLES_MESSAGES } = INDEX_VALIDATOR

const dataIndexValidator = await getDataIndexValidator({
    email: "andres.valencia@talent.com",
    password: "Valencia10.",
    scanid: "261653"
})
// scanid: "263384" static
// scanid: "263423" api

// const response = await openai.createCompletion({
//     model: "gpt-3.5-turbo",
//     messages: [
//         {
//             role,
//             content: content(dataIndexValidator)
//         }
//     ]
// })
const messages = {
    role: SYSTEM_MESSAGE.role,
    content: `${SYSTEM_MESSAGE.content} [[START]] ${dataIndexValidator} [[END]]}`,
}
console.log(messages)