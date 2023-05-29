import { Router, json } from 'express'
import cors from "cors"
import configs from '../configs.js'

const { API_KEY } = configs
const loginRouter = Router()

loginRouter.use(json())
loginRouter.use(cors())

loginRouter.post('/login', (req, res) => {
    const { key } = req.body
    if (key === API_KEY) {
        res.status(200).json({
            message: 'Login successful',
            key: API_KEY
        })
    } else {
        res.status(401).json({error: 'Unauthorized'})
    }
})

export default loginRouter