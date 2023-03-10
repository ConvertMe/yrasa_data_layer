import { Request, Response, NextFunction } from "express"
import { body, validationResult } from "express-validator"
import fs from "fs"
import { responseToClient } from "../../auxiliary/response"
import ApiError from "../../exceptions/api-error"
import SaveService from '../../service/avito_apart_new_building/save.service'
import getDateService from "../../service/avito_apart_new_building/get.date.service"
import { PayloadDataI } from "../../service/types"
import { RequestFiltersType } from "../../router/type"

class DataController {

    async parseFeed(req: Request, res: Response, next: NextFunction) {

        try {
            if(!req.body || !req.body.userId || !req.body.email || !req.body.service) {
                if(req.file?.path) fs.unlinkSync(req.file.path)
                return next(ApiError.BadRequest("Invalid values userId, email, service", ["err16"]))
            }

            if (!req.file || !req.file.path) return next(ApiError.BadRequest("Invalid file", ["err1"]))
            if (req.file.mimetype.split("/")[1] !== 'json') {
                fs.unlinkSync(req.file.path)
                return next(ApiError.BadRequest("Invalid format file", ["err2"]))
            }
            if (!req.headers.authorization) return next(ApiError.UnauthorizedError("err3"))

            const accessToken = req.headers.authorization?.split(" ")[1]

            if(!accessToken || accessToken !== process.env.ACCESS_SECRET_KEY) return next(ApiError.UnauthorizedError("err4"))

            const { userId, email, service } = req.body


            const payload: PayloadDataI = {
                path: req.file.path,
                userId, email, service, 
                createdAt: new Date().toISOString().slice(0, 19).replace('T', '_').replace(":", "-").replace(":", "-") 
            }

            const saveFile = await SaveService.checkAndSave(payload).then(res => res)


            if (saveFile) {
                return responseToClient(200, saveFile, res)
            } else {
                fs.unlinkSync(req.file.path)
                return next(ApiError.ErrorSavedFile("err5"))
            }
        }
        catch (e) {
            next(e)
        }
    }
}

export default new DataController()