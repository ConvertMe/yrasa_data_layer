import fs from "fs"
import path from "path"
import { v1 } from "uuid"
import CheackAvitoService from "./check.avito.service"
import ApiError from "../exceptions/api-error"
import { PayloadDataI } from "./types"
import { check } from "express-validator"


class DataService {

    async checkAndSave(payload: PayloadDataI) {
        try {

            const writeFile = await this.save(payload)

            try {
                if(!writeFile?.message.path) throw ApiError.ErrorSavedFile("err6")
                const data = fs.readFileSync(writeFile.message.path, 'utf8')
                CheackAvitoService.checkKeys(data)
            } catch (e) {
                if(writeFile?.message.path) fs.unlinkSync(writeFile.message.path)
/*              throw ApiError.ErrorSavedFile("err7") */
                throw e
            }

            return writeFile
        } catch (e) {
            throw e
        }
    }

    private async save(payload: PayloadDataI) {
        try {
            let pathTofile: null | string = null

            if (path) {

                pathTofile = path.join(__dirname, "..", "data", "avito", `${payload.userId}&${payload.login}&${payload.service}&${payload.createdAt}=${v1()}${v1()}.data.json`)


                try {
                    let removed = false

                    let fd = fs.readdirSync(path.join(__dirname, "..", "data", "avito"))

                    const regular = new RegExp(`${payload.userId}&${payload.login}&${payload.service}&${payload.createdAt}*`)

                    fd.forEach((e, i) => {
                            if(regular.test(e)) fs.unlinkSync(path.join(__dirname, "..", "data", "avito", e))
                            if(i === fd.length - 1)
                            removed = true
                    })

                    fs.renameSync(payload.path, pathTofile)
                } 
                catch(e) {
                    pathTofile = null
                    fs.unlinkSync(payload.path)
                    throw ApiError.BadRequest("error saved file", ["err8"])             
                }

                if (!pathTofile) {
                    throw ApiError.BadRequest("error saved file", ["err9"])}
                return {
                    message: {
                        path: pathTofile
                    }
                }
            }
        } catch (e) {
            throw e
        }
    }

}

export default new DataService()