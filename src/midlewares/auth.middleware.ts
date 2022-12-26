import {Request, Response, NextFunction} from "express"
import ApiError from "../exceptions/api-error"


export default () => (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization

        if(!authHeader) {
            next(ApiError.UnauthorizedError("err12"))
            return
        }
        //berer
        const accessToken = authHeader.split(" ")[1]
        if(!accessToken) {
            next(ApiError.UnauthorizedError("err13"))
        }

        //@ts-ignore
        req.user = userData
        next()
    } catch (e) {
        next(ApiError.UnauthorizedError("err14"))
    }
}