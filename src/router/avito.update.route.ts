import { Router, Request } from 'express'
import { body } from 'express-validator'
import updateController from '../controllers/avito_apart_new_building/update.controller'


/**
 * @swagger
 * components:
 *   schemas:
 *     avitoUpdate:
 *       type: object
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
 *         updateValues:
 *           type: array
 *           items:
 *             type: object
 *             required:
 *               - id
 *               - key
 *               - values
 *             properties:
 *               id:
 *                 type: string
 *                 example: sad213fd123
 *               key:
 *                 type: string
 *                 example: Status
 *               tag:
 *                 type: string
 *                 example: url
 *               attr:
 *                 type: string
 *                 example: Options
 *               values:
 *                 type: array
 *                 items: 
 *                   type: string
 *                   example: free
 */

/**
  * @swagger
  * tags:
  *   name: avito-feed
  *   description: Data set
  */

/**
 * @swagger
 * /api/update-feed:
 *   put:
 *     summary: Set date
 *     tags: [avito-feed] 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json;charset=UTF-8:
 *           schema:
 *             $ref: '#/components/schemas/avitoUpdate'
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
 *                   example: "data has been changed"
 *                     
*/

const router = Router()

router
.put('/update-feed', 
body("userId").isLength({min: 1}),
body("login").isLength({min: 3, max: 50}),
body("service").isLength({min: 3, max: 30}),
body("pathToFile").isLength({min: 5}),
body("updateValues").isArray({min: 1}),
updateController.update)

export default router