
import ApiError from "../../exceptions/api-error"
import { RequestFiltersType } from "../../router/type"
import { nameFiltersParams, rooms } from "../../settings/avito/sell.new.building.avito.data"
import { AvitoFeedI } from "../../settings/types"
import { FiltersType } from "../types"

class FiltersService {

    parseFilters(data: AvitoFeedI[], filters: RequestFiltersType): AvitoFeedI[] {

        const filtersValidate = this.validateKeys(filters)
       
        let responseData: AvitoFeedI[] = data

        if(filtersValidate.byArgument.length > 0) filtersValidate.byArgument.forEach(e => {
            
            responseData = this.byArgument(responseData, e)
        })
        
        if (filtersValidate.byMinMax.length > 0) filtersValidate.byMinMax.forEach(e => {
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
                    const regularId = new RegExp(params[1])
                    responseData = object.filter((e) => regularId.test(e.Id._text))
                    break
                case "byWords":
                    const regular = new RegExp(params[1])
                    responseData = object.filter(e => regular.test(e.Description._text))
                    break
                case "byRoom":
                    if(!rooms.includes(String(params[1]))) break
                    responseData = object.filter(e =>  e.Rooms._text == String(params[1]))
                    break
                case "byComplex": {
                    let complexRegular = new RegExp(params[1])
                    
                }
                default: break
            }
            return responseData
        } catch (e) {
            throw e
        }
    }    
    
    private minMax(object: AvitoFeedI[], params: [index: FiltersType, o: number, t: number]): AvitoFeedI[] {
        try {
            const checkNumbers = (values: string, params: [index: FiltersType, o: number, t: number] ) => {
                if(params[1] && params[2]) {
                    if( Number(values) >= params[1] && Number(values) <= params[2]) return true
                } else if (params[1]) {
                    if( Number(values) >= params[1]) return true
                } else if (params[2]) {
                    if(Number(values) <= params[2]) return true
                } else return false  
            }

            let responseData: AvitoFeedI[] = object

            switch (params[0]){
                case "byPrice":
                    responseData = object.filter(e => checkNumbers(e.Price._text, params))
                    break
                case "bySquare":
                    responseData = object.filter(e => checkNumbers(e.Square._text, params))
                    break
                case "byFloor":
                    responseData = object.filter(e => checkNumbers(e.Floor._text, params))
                    break
                default: break
            }

            return responseData
        } catch (e) {
            throw e
        }
    }

    private validateKeys(filters: RequestFiltersType): {byArgument: any[], byMinMax: any[]} {
        try {
            let byArgument: any[] = []
            let byMinMax: any[] = []
            let errorsKeys: string[] = []
            if(filters.byArgument) filters.byArgument.forEach(e => {
                if(!nameFiltersParams.includes(e[0])) errorsKeys.push(e[0])
                if( e[1]) byArgument.push(e)
            })
            if(filters.byMinMax) filters.byMinMax.forEach(e => {
                if(!nameFiltersParams.includes(e[0])) errorsKeys.push(e[0])
                if(e[0], e[1] || e[2]) byMinMax.push(e)
            })  
            if(errorsKeys.length > 0) throw ApiError.BadRequest("err32", errorsKeys)
            return {
                byArgument, byMinMax 
            }
        } catch (e) {
            throw e
        }
    }
}

export default new FiltersService()