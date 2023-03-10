import { Response } from "express"

export function responseToClient(status: number = 200, values: any, res: Response){
    const data = {
        "status": status,
        "values": values
    }

    res.status(data.status)
    res.json(data)
    res.end()
}