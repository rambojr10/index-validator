import dotenv from "dotenv"
dotenv.config()

import { Router, json } from 'express'
import cors from "cors"

const { API_KEY_ACCESS } = process.env
const loginRouter = Router()

loginRouter.use(json())
loginRouter.use(cors())

loginRouter.post('/login', (req, res) => {
    const { key } = req.body
    if (key === API_KEY_ACCESS) {
        res.status(200).json({
            message: 'Login successful',
            key: API_KEY_ACCESS
        })
    } else {
        res.status(401).json({error: 'Unauthorized'})
    }
})

export default loginRouter