import { Request, Response, NextFunction } from "express"
import fs from "fs"
import path from "path"
import ApiError from "../exceptions/api-error"
import DataService from '../service/data.service'
import { PayloadDataI } from "../service/types"

class DataController {

    async parseFeed(req: Request, res: Response, next: NextFunction) {

        try {
            if(!req.body || !req.body.userId || !req.body.login || !req.body.service || !req.body.createdAt) {
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

            const { userId, login, service, createdAt } = req.body

            fs.readdir(path.join(__dirname, "..", "data", "avito"), (err, fd) => {
                const regular = new RegExp(`/${userId}&${login}&${service}&${createdAt}`)
                fd.forEach(item => console.log(regular.test(item)))
              })


            const payload: PayloadDataI = {
                path: req.file.path,
                userId, login, service, createdAt
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