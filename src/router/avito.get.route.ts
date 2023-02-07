import { Router } from 'express'
import { body } from "express-validator"
import saveController from '../controllers/avito_apart_new_building/save.controller'

/**
 * @swagger
 * components:
 *   schemas:
 *     getDataAvito:
 *       type: object
 *       properties:
 *         status:
 *           type: integer
 *           example: 200
 *         message: 
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
 *     bodyGetFeed:
 *      type: object
 *      required:
 *        - userId
 *        - login
 *        - service
 *      properties:
 *        userId:
 *          type: integer
 *          example: 1
 *        login:
 *          type: string
 *          example: user login
 *        service:
 *          type: string
 *          example: service
 *        page:
 *          type: integer
 *          example: 1  
 *        limit:
 *          type: integer
 *          example: 10
 *        filters:
 *          type: object
 *          properties:
 *            byArgument:
 *              type: array
 *              items:
 *                type: array
 *                items:
 *                  oneOf:
 *                    - type: string
 *                    - type: string
 *            minMax:
 *              type: array
 *              items:
 *                type: array
 *                items:
 *                  oneOf:
 *                    - type: string
 *                    - type: integer
 *                    - type: integer
 *        
 */

/**
  * @swagger
  * tags:
  *   name: avito-feed
  *   description: Data set
*/

/**
* @swagger
* /api/get-feed:
*  post:
*     summary: Get date
*     tags: [avito-feed]
*     requestBody:
*       required: true
*       content:
*         application/json;charset=UTF-8:
*           schema:
*             $ref: '#/components/schemas/bodyGetFeed'
*     responses:
*       200:
*         description: Returned array
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/getDataAvito'
*       404:
*         description: The book was not found
*/


const router = Router()

router.post('/get-feed',
  body("userId").exists().isLength({ min: 1, max: 5 }),
  body("login").exists().isLength({ min: 1, max: 50 }),
  body("service").exists().isLength({ min: 1, max: 50 }),
  saveController.getAll)

export default router