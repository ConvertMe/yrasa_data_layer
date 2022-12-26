import { Router, Request } from 'express'
import { body } from "express-validator"
import multer from 'multer'
import path from 'path'
import dataController from '../controllers/data.controller'

const fileStorageEngine = multer.diskStorage({
    destination: (req: Request, file: any, cb: any) => {
        cb(null, path.join(__dirname, "..", "data", "avito"))
    },
    filename: (req: Request, file: any, cb: any) => {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: fileStorageEngine })

const router = Router()

router.post('/set-feed',
    upload.single("JsonDataAvito"),
    dataController.parseFeed)

export default router