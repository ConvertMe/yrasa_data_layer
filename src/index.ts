import express from 'express'
import cors from 'cors' 
import dotenv from "dotenv"
import dataRoute from './router/data.route'
import errorMiddleware from "./midlewares/error-middleware"

dotenv.config()

const app = express()

const PORT = process.env.PORT || 1369

app.use(express.json())
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))
app.use('/api', dataRoute)
app.use(errorMiddleware)

const start = () => {
    try {
        app.listen(PORT, () => console.log('Server started on port: ' + PORT))
    } catch (e) {
        console.error(e)
    }
}

start()