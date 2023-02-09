
import ApiError from "../../exceptions/api-error"
import { RequestFiltersType } from "../../router/type"
import { nameFiltersParams, rooms } from "../../settings/avito/sell.new.building.avito.data"
import { AvitoFeedI } from "../../settings/types"
import { FiltersType } from "../types"

class FiltersService {

    parseFilters(data: AvitoFeedI[], filters: RequestFiltersType): AvitoFeedI[] {

        if (!filters.byArgument) return data
        this.validateKeys(filters)

        let responseData: AvitoFeedI[] = data

        filters.byArgument.forEach(e => {
            
            responseData = this.byArgument(responseData, e)
        })

        if (filters.minMax) filters.minMax.forEach(e => {
            //min-max filters
            responseData = this.minMax(responseData, e)
        })
        return responseData
    }

    private byArgument(object: AvitoFeedI[], params: [i: FiltersType, o: string]): AvitoFeedI[] {
        try {

            let responseData: AvitoFeedI[] = object

            switch (params[0]){
                case "byId":
                    responseData = object.filter((e) => e.Id._text === params[1] ? true : false)
                    break
                case "byDescription":
                    const regular = new RegExp(params[1])
                    responseData = object.filter(e => regular.test(e.Description._text))
                    break
                case "byRooms":
                    if(!rooms.includes(String(params[1]))) break
                    responseData = object.filter(e =>  e.Rooms._text == String(params[1]))
                    break
                default: break
            }
            return responseData
        } catch (e) {
            throw e
        }
    }    
    
    private minMax(object: AvitoFeedI[], params: [index: FiltersType, o: number, t: number]): AvitoFeedI[] {
        try {
            let responseData: AvitoFeedI[] = object

            switch (params[0]){
                case "byPrice":
                    responseData = object.filter(e => Number(e.Price._text) >= params[1] && Number(e.Price._text) <= params[2])
                    break
                case "bySquare":
                    responseData = object.filter(e => Number(e.Square._text) >= params[1] && Number(e.Square._text) <= params[2])
                    break
                case "byFloor":
                    responseData = object.filter(e => Number(e.Floor._text) >= params[1] && Number(e.Floor._text) <= params[2])
                    break
                default: break
            }

            return responseData
        } catch (e) {
            throw e
        }
    }

    private validateKeys(filters: RequestFiltersType): void {
        try {
            let errorsKeys: string[] = []
            if(filters.byArgument) filters.byArgument.forEach(e => {
                if(!nameFiltersParams.includes(e[0]) || !e[1]) errorsKeys.push(e[0])
            })
            if(filters.minMax) filters.minMax.forEach(e => {
                if(!nameFiltersParams.includes(e[0]) || !e[1] || !e[2]) errorsKeys.push(e[0])
            })  
            if(errorsKeys.length > 0) throw ApiError.BadRequest("err32", errorsKeys)
        } catch (e) {
            throw e
        }
    }
}

export default new FiltersService()