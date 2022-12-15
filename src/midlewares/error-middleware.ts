import {Request, Response, NextFunction} from "express"
import ApiError from "../exceptions/api-error"

export default function (err: any, req: Request, res: Response, next: NextFunction)  {
    
    if (err instanceof ApiError) {
        return {status: err.status, messages: {message: err.message, errors: err.errors}}
    }
    
    return {status: 500, messages: {message: "Непредвиденная ошибка"}}
}