import { Router, Request } from 'express'
import { query } from "express-validator"
import multer from 'multer'
import path from 'path'
import saveController from '../controllers/avito_apart_new_building/save.controller'

/**
 * @swagger
 * components:
 *   schemas:
 *     data:
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
 *     getDate:
 *       type: object
 *       properties:
 *         status:
 *           type: integer
 *           example: 200
 *         values: 
 *           type: object
 *           properties:
 *             previousPage:
 *                type: string
 *                example: string or null
 *             nextPage:
 *                type: integer
 *                example: 2
 *             total:
 *                type: integer
 *                example: 1
 *             currentPage:
 *                type: integer
 *                example: 1
 *             items:
 *               type: array
 *               items:
 *                 type: string
 *                 example: object avito feed{}

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
 *             $ref: '#/components/schemas/data'
 *     responses:
 *       200:
 *         description: Data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/data'
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

    
    /**
    * @swagger
    * /api/get-feed:
    *  get:
    *     summary: Get date
    *     tags: [avito-feed]
    *     parameters:
    *       - in: path
    *         name: userId
    *         schema:
    *           type: string
    *         required: true
    *         description: user userId
    *       - in: path
    *         name: login
    *         schema:
    *           type: string
    *         required: true
    *         description: user login
    *       - in: path
    *         name: service
    *         schema:
    *           type: string
    *         required: true
    *         description: service
    *       - in: path
    *         name: page
    *         schema:
    *           type: string
    *         description: page number
    *       - in: path
    *         name: limit
    *         schema:
    *           type: string
    *         description: limit elements
    *     responses:
    *       200:
    *         description: Returned array
    *         content:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/getDate'
    *       404:
    *         description: The book was not found
    */   

    
router.get('/get-feed',
    query("userId").isLength({ min: 1, max: 5 }),
    query("login").isLength({ min: 1, max: 50 }),
    query("service").isLength({ min: 1, max: 50 }),
    saveController.getAll)

export default router