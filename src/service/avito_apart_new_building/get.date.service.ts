import fs from "fs"
import path from "path"
import ApiError from "../../exceptions/api-error"
import { userDateI } from "../types"
import filtersService from "./filters.service"


class GetData {

    async getAll(userDate: userDateI) {
        try {
            const data = await this.getDate(userDate)

            const dataAfterFiltering = filtersService.parseFilters(data, userDate.filters)

            if(userDate.limitAndPage) {
                let [limit, page] = userDate.limitAndPage

            return this.paginate(dataAfterFiltering, page, limit)

            } else return this.paginate(dataAfterFiltering)

        } catch (e) {
            throw e
        }
    }

    private async getDate(userDate: userDateI) {
        try {
            let pathToFile: string | null = null

            let fd = fs.readdirSync(path.join(__dirname, "..", "..", "data", "avito"))
    
            const regular = new RegExp(`${userDate.userId}&${userDate.login}&${userDate.service}*`)
    
            fd.forEach((e) => {
                if(regular.test(e)) pathToFile = e
            })
            if(pathToFile) {
                return await this.readFile(path.join(__dirname, "..", "..", "data", "avito", pathToFile))
            }

            throw ApiError.BadRequest("invalid user data", ["err19"])
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

    private paginate = (items: any[], page = 1, perPage = 10) => {
        try {
            const offset = perPage * (page - 1)
            const totalPages = Math.ceil(items.length / perPage)
            const paginatedItems = items.slice(offset, perPage * page)
          
            return {
                previousPage: page - 1 ? page - 1 : null,
                nextPage: (totalPages > page) ? page + 1 : null,
                total: items.length,
                currentPage: totalPages,
                items: paginatedItems
            }
        } catch (e) {
            throw ApiError.SomethingWentWrong("err20")
        }
    }
}


export default new GetData()