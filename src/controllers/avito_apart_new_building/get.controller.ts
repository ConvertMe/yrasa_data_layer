import { Request, Response, NextFunction } from "express"
import { body, validationResult } from "express-validator"
import { responseToClient } from "../../auxiliary/response"
import ApiError from "../../exceptions/api-error"
import getDateService from "../../service/avito_apart_new_building/get.date.service"


class DataController {

    async getAll (req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()) {
                return next(ApiError.BadRequest("Invalid value", errors.array()))
            }

            const {userId, email, service, filters} = req.body
            let limitAndPage = [Number(req.body.limit), Number(req.body.page)]

            const paramsUser: any = {
                userId, email, service, limitAndPage, filters
            }

            return responseToClient(200, await getDateService.getAll(paramsUser), res)
        } catch (e) {
            next(e)
        }
    }

    async getOne (req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()) {
                return next(ApiError.BadRequest("Invalid value", errors.array()))
            }

            const {userId, email, service, id} = req.body

            const paramsUser = {
                userId, email, service, id
            }

            return responseToClient(200, await getDateService.getOne(paramsUser), res)
        } catch (e) {
            next(e)
        }
    }
}

export default new DataController()