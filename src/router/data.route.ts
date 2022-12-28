import { Router, Request } from 'express'
import { query } from "express-validator"
import multer from 'multer'
import path from 'path'
import saveController from '../controllers/avito_apart_new_building/save.controller'

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
    saveController.parseFeed)

router.get('/get-feed',
    query("userId").isLength({ min: 1, max: 5 }),
    query("login").isLength({ min: 1, max: 50 }),
    query("service").isLength({ min: 1, max: 50 }),
    saveController.getAll)

export default router