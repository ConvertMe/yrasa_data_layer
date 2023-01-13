import { Router, Request } from 'express'
import multer from 'multer'
import path from 'path'
import saveController from '../controllers/avito_apart_new_building/save.controller'

/**
 * @swagger
 * components:
 *   schemas:
 *     setDataAvito:
 *       type: object
 *       required:
 *         - userId
 *         - login
 *         - service
 *         - JsonDataAvito
 *       properties:
 *         userId:
 *           type: integer
 *           example: 1
 *         login:
 *           type: string
 *           example: login
 *         service:
 *           type: string
 *           example: avito
 *         JsonDataAvito:
 *           type: file
 *           description: json
 *       example:
 *         userId: 1
 *         login: alex
 *         service: avito
 *         JsonDataAvito: file.json
 */

/**
  * @swagger
  * tags:
  *   name: avito-feed
  *   description: Data set
  */

/**
 * @swagger
 * /api/set-feed:
 *   post:
 *     summary: Set date
 *     tags: [avito-feed] 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json;charset=UTF-8:
 *           schema:
 *             $ref: '#/components/schemas/setDataAvito'
 *     responses:
 *       200:
 *         description: Data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "ecdsa37a30-ds90f4-11dsed-aads9c-6355b04f8ed7ecdsa37a31-90f4-11ed-aa9c-6355b04f8ed7.data.json"
 *                    
 *                   
*/

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

export default router