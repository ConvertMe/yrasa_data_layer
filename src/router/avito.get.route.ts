import { Router } from 'express'
import { query } from "express-validator"
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
*               $ref: '#/components/schemas/getDataAvito'
*       404:
*         description: The book was not found
*/


const router = Router()

router.get('/get-feed',
    query("userId").isLength({ min: 1, max: 5 }),
    query("login").isLength({ min: 1, max: 50 }),
    query("service").isLength({ min: 1, max: 50 }),
    saveController.getAll)

export default router