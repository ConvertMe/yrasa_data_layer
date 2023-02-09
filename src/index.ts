import express from 'express'
import cors from 'cors' 
import dotenv from "dotenv"
import swaggerUI from "swagger-ui-express"
import swaggerJsDoc from "swagger-jsdoc"
import avitoSaveRoute from './router/avito.save.route'
import avitoGetRoute from './router/avito.get.route'
import avitoUpdateRoute from './router/avito.update.route'
import errorMiddleware from "./midlewares/error-middleware"
import path from 'path'
import NewDevelopmentIdService from './service/avito_apart_new_building/NewDevelopmentId.service'

dotenv.config()

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Yrasa Data Layer",
			version: "1.0.0",
			description: "Docs API",
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

app.use('/api', avitoSaveRoute)
app.use('/api', avitoGetRoute)
app.use('/api', avitoUpdateRoute)
app.use(errorMiddleware)

const start =  async () => {
    try {
		NewDevelopmentIdService.getAndSaveIds()
        app.listen(PORT, () => console.log('Server started on port: ' + PORT))
    } catch (e) {
        console.error(e)
    }
}

start()