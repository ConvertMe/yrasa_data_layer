import {Request, Response, NextFunction} from "express"
import { responseToClient } from "../auxiliary/response"
import ApiError from "../exceptions/api-error"

export default function (err: any, req: Request, res: Response, next: NextFunction)  {
    
    if (err instanceof ApiError) {
        return responseToClient(err.status, {message: err.message, errors: err.errors}, res)
    }
    
    return responseToClient(500, {message: "Somebody error"}, res)
}