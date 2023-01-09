import express from 'express'
import cors from 'cors' 
import dotenv from "dotenv"
import swaggerUI from "swagger-ui-express"
import swaggerJsDoc from "swagger-jsdoc"
import dataRoute from './router/data.route'
import errorMiddleware from "./midlewares/error-middleware"
import path from 'path'

dotenv.config()

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Library API",
			version: "1.0.0",
			description: "A simple Express Library API",
		},
		servers: [
			{
				url: "http://localhost:1369",
			},
		],
	},
	apis: [path.join(__dirname, "router") + "/*.ts"],
}

const specs = swaggerJsDoc(options)

const app = express()

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs))

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