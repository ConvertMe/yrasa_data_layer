import { Request, Response, NextFunction } from "express"
import { validationResult } from "express-validator"
import fs, { read } from "fs"
import path from "path"
import { v1 } from "uuid"
import ApiError from "../exceptions/api-error"
import DataService from '../service/data.service'
import { PayloadDataI } from "../service/types"

class DataController {

    async parseFeed(req: Request, res: Response, next: NextFunction) {

        try {

            if (!req.file || !req.file.path) return next(ApiError.BadRequest("Invalid file", "err1"))
            if (req.file.mimetype.split("/")[1] !== 'json') {
                fs.unlinkSync(req.file.path)
                return next(ApiError.BadRequest("Invalid format file", "err2"))
            }
            if (!req.headers.authorization) return next(ApiError.UnauthorizedError("err3"))

            const accessToken = req.headers.authorization?.split(" ")[1]

            if(!accessToken || accessToken !== process.env.ACCESS_SECRET_KEY) return next(ApiError.UnauthorizedError("err4"))

            const { userId, login, createdAt } = req.body




            const payload: PayloadDataI = {
                accessTonen: '32',
                path: req.file.path,
                userId, login, createdAt
            }

            const saveFile = await DataService.checkAndSave(payload).then(res => res)


            if (saveFile) {
                return res.status(200).json(saveFile)
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