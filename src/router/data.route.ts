import { Router, Request } from 'express'
import { body } from "express-validator"
import multer from 'multer'
import path from 'path'
import {v1} from "uuid"
import dataController from '../controllers/data.controller'
import authMiddleware from "../midlewares/auth.middleware"

const fileStorageEngine = multer.diskStorage({
    destination: (req: Request, file: any, cb: any) => {
        cb(null, path.join(__dirname, "..", "data", "avito"))
    },
    filename: (req: Request, file: any, cb: any) => {
        cb(null, v1() + ".data.json")
    }
})

const upload = multer({ storage: fileStorageEngine })

const router = Router()

router.get("/", (req, res) => res.send("hello"))

router.post('/set-feed',
    upload.single("xmlDataAvito"),
    dataController.parseFeed)

export default router