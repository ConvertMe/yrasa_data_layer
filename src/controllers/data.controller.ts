import { Request, Response, NextFunction } from "express"
import fs from "fs"
import ApiError from "../exceptions/api-error"
import DataService from '../service/data.service'

class DataController {

    async parseFeed(req: Request, res: Response, next: NextFunction) {
        
        try {
            console.log(req.file)
            if(req.file && req.file.mimetype.split("/")[1] === 'json') {
                
/*                 const accessToken = req.headers.authorization?.split(" ")[1]
                if(!accessToken) {
                    return next(ApiError.UnauthorizedError())
                } */

/* const pasrseXml = await DataService.parse(req.file.path, accessToken).then(res => res) */

                return {status: 200, res: "saved data"}
            } else {
                if (req.file?.path) {
                    fs.rm(req.file.path, { recursive: true }, (err) => {
                        if (err) {
                            // File deletion failed
                            next(ApiError.BadRequest("Error saved file"))
                        }
                })}
                return next(ApiError.BadRequest("File error"))
            }
        }
        catch (e) {
            next(e)
        }
    }
}

export default new DataController()