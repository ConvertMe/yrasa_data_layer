import ApiError from "../exceptions/api-error"
import sellAvito from "../settings/avito/sell.new.building.avito"


class CheackAvitoService {
    
    checkKeys(objectReq: any) {
        try {
            const object = JSON.parse(objectReq)
            const params = sellAvito.map((item) => item.paramName)
            let errorsStr: any[] = []
            let errorsRefs: any[] = []
            let errorsTags: any[] = []

            if(!object) throw ApiError.BadRequest("invalid data", ["err10"])        

            if(!object.Ads.Ad.length) throw ApiError.BadRequest("Мин. колличество 2", ["err15"])            

            object.Ads.Ad.forEach((objXml: any) => {
                for (let keyXml in objXml) {

                    // Check str tag
                    if (!params.includes(keyXml)) errorsStr.push(keyXml)

                    sellAvito.forEach((sell) => {
                        if (keyXml === sell.paramName) {
                            //check values (refs)
                            if (sell.type === "ref") {
                                if (!sell.refs!.includes(objXml[keyXml]["_text"])) errorsRefs.push([sell.paramName, objXml[keyXml]["_text"]])
                            }
                            //check tags
                            if (sell.type === "tag") {
                                for (let tag in objXml[keyXml]) {
                                    if (!sell.tags?.includes(tag)) errorsTags.push(["invalid tag", tag])
                                }
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
}

export default new CheackAvitoService()