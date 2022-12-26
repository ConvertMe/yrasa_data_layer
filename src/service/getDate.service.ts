import fs from "fs"
import path from "path"
import ApiError from "../exceptions/api-error"
import { userDateI } from "./types"


class GetDate {

    async getAll(userDate: userDateI) {
        try {
            let pathToFile: string | null = null

            let fd = fs.readdirSync(path.join(__dirname, "..", "data", "avito"))
    
            const regular = new RegExp(`${userDate.userId}&${userDate.login}&${userDate.service}*`)
    
            fd.forEach((e) => {
                if(regular.test(e)) pathToFile = e
            })
            if(pathToFile) return  await this.readFile(path.join(__dirname, "..", "data", "avito", pathToFile))

        } catch (e) {
            throw e
        }
    }

    private async readFile(path: string) {
        try {
            const data: any = JSON.parse(fs.readFileSync(path, { encoding: 'utf8' }))
            if(!data.Ads.Ad) throw ApiError.SomethingWentWrong(["err17"])
            return data.Ads.Ad
          } catch (e) {
            throw ApiError.SomethingWentWrong(["err18"])
          }
    }
}


export default new GetDate()