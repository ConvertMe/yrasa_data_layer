import { ReqUpdateAvitoType, UpdateAvitoValuesType } from "../../controllers/types"
import ApiError from "../../exceptions/api-error"
import sellAvito from "../../settings/avito/sell.new.building.avito"

class CheackAvitoService {

    checkKeys(objectReq: any) {
        try {
            const object = JSON.parse(objectReq)
            let errorsStr: any[] = []
            let errorsRefs: any[] = []
            let errorsTags: any[] = []

            if (!object) throw ApiError.BadRequest("invalid data", ["err10"])

            if (!object.Ads.Ad.length) throw ApiError.BadRequest("Мин. колличество 2", ["err15"])

            object.Ads.Ad.forEach((objXml: any) => {

                for (let keyXml in objXml) {
                    //Check str tag
                    if (this.matchCheckParamName(keyXml)) errorsStr.push(keyXml)
                    sellAvito.forEach((sell) => {
                        if (keyXml === sell.paramName) {
                            //check tags
                            if (sell.type === "tag") {
                                for (let tag in objXml[keyXml]) {
                                    if (!sell.tags?.includes(tag)) errorsTags.push(["invalid tag", tag])
                                }
                            }
                            //check values (refs)
                            if (sell.type === "ref") {
                                if (!sell.refs!.includes(objXml[keyXml]["_text"])) errorsRefs.push([sell.paramName, objXml[keyXml]["_text"]])
                            }
                        }
                    })
                }
            })

            if (errorsStr.length > 0) throw ApiError.BadRequest("Неверно сформирован файл, прочтите инструкцию авито по формированию файла errCode: err11", errorsStr)
            if (errorsRefs.length > 0) throw ApiError.BadRequest("Неверно сформирован файл, прочтите инструкцию авито по формированию файла errCode: err12", errorsRefs)
            if (errorsTags.length > 0) throw ApiError.BadRequest("Неверно сформирован файл, прочтите инструкцию авито по формированию файла errCode: err13", errorsTags)

            return true
        } catch (e) {
            throw e
        }
    }

    checkReqUpdateValues(paramsUpdate: ReqUpdateAvitoType) {
        try {
            let errors: { tag: string, value: string }[] = []

            paramsUpdate.updateValues.forEach((updateE: UpdateAvitoValuesType) => {

                if (this.matchCheckParamName(updateE.key)) errors.push({ tag: updateE.key, value: updateE.values[0] })

                paramsUpdate.updateValues.forEach(e => {
                    if (e.tag) {
                        this.matchCheckTag(e.key, e.tag)
                        this.matchCheckValues(e.key, e.values)
                    }
                })

            })
            if (errors.length > 0) throw ApiError.BadRequest("Неверно сформирован файл, прочтите инструкцию авито по формированию файла errCode: err29", errors)
            return true
        } catch (e) {
            throw e
        }
    }

    private matchCheckParamName(paramName: string) {
        const sellArray = sellAvito.map((item) => item.paramName)
        return !sellArray.includes(paramName)
    }

    private matchCheckTag(paramName: string, tagName: string) {

        let errorsTags: any[] = []

        if (!tagName) throw ApiError.BadRequest("dsads")

        sellAvito.forEach(sell => {
            if (sell.paramName === paramName && !sell.tags?.includes(tagName)) errorsTags.push(["invalid tag", tagName])
        })

        if (errorsTags.length > 0) throw ApiError.BadRequest("Invalid tags err31", errorsTags)
        return true
    }


    private matchCheckValues(paramName: string, values: string[]) {
        let errorsValues: any[] = []

        if (!values) throw ApiError.BadRequest("dsads")

        sellAvito.forEach(sellE => {
            if (sellE.paramName === paramName) {
                values.forEach(valueE => {
                    if (paramName === "Images") return
                    if (!sellE.refs?.includes(valueE)) errorsValues.push({ paramName, valueE })
                })
            } else return
        })

        if (errorsValues.length > 0) throw ApiError.BadRequest("Invalid values err30", errorsValues)

        return true
    }

}

export default new CheackAvitoService()