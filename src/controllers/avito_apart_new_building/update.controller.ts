import { NextFunction, Request, Response } from "express"
import { validationResult } from "express-validator"
import { responseToClient } from "../../auxiliary/response"
import ApiError from "../../exceptions/api-error"
import updateService from "../../service/avito_apart_new_building/update.service"
import { ReqUpdateAvitoType } from "../types"

class DataUpdate {
    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest("Invalid value", errors.array()))
            }

            const data: ReqUpdateAvitoType = req.body
            
            return responseToClient(200, await updateService.update(data), res)
            
        } catch (e) {
            next(e)
        }

    }
}

export default new DataUpdate()