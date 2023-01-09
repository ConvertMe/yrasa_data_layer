import { Request, Response, NextFunction } from "express"
import { validationResult } from "express-validator"
import fs from "fs"
import { responseToClient } from "../../auxiliary/response"
import ApiError from "../../exceptions/api-error"
import SaveService from '../../service/avito_apart_new_building/save.service'
import getDateService from "../../service/avito_apart_new_building/get.date.service"
import { PayloadDataI, userDateI } from "../../service/types"

class DataController {

    async parseFeed(req: Request, res: Response, next: NextFunction) {

        try {
            if(!req.body || !req.body.userId || !req.body.login || !req.body.service) {
                if(req.file?.path) fs.unlinkSync(req.file.path)
                return next(ApiError.BadRequest("Invalid values", ["err16"]))
            }

            if (!req.file || !req.file.path) return next(ApiError.BadRequest("Invalid file", ["err1"]))
            if (req.file.mimetype.split("/")[1] !== 'json') {
                fs.unlinkSync(req.file.path)
                return next(ApiError.BadRequest("Invalid format file", ["err2"]))
            }
            if (!req.headers.authorization) return next(ApiError.UnauthorizedError("err3"))

            const accessToken = req.headers.authorization?.split(" ")[1]

            if(!accessToken || accessToken !== process.env.ACCESS_SECRET_KEY) return next(ApiError.UnauthorizedError("err4"))

            const { userId, login, service } = req.body


            const payload: PayloadDataI = {
                path: req.file.path,
                userId, login, service, 
                createdAt: new Date().toISOString().slice(0, 19).replace('T', '/').replace(":", "_").replace(":", "_") 
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

    async getAll (req: Request, res: Response, next: NextFunction) {

        try {
            const errors = validationResult(req)
    
            if(!errors.isEmpty()) {
                return next(ApiError.BadRequest("Invalid value", errors.array()))
            }
    
            const {userId, login, service} = req.query
            let limitAndPage: null | any[] = null
            if(req.query.limit && req.query.page) limitAndPage = [Number(req.query.limit), Number(req.query.page)]

            //@ts-ignore
            return responseToClient(200, await getDateService.getAll({userId, login, service, limitAndPage}), res)
        } catch (e) {
            next(e)
        }
    }
}

export default new DataController()