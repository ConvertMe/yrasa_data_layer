import fs from "fs"
import path from "path"
import { FileAvitoI } from "../../settings/types"
import { ReqUpdateAvitoType, UpdateAvitoValuesType } from "../../controllers/types"
import ApiError from "../../exceptions/api-error"
import checkService from "./check.service"



class UpdateData {

    async update(paramsUpdate: ReqUpdateAvitoType) {
        try {
            if (!paramsUpdate || !paramsUpdate.pathToFile) throw ApiError.BadRequest("Invalid path", "err21")
            let json: null | string = null

            if (!checkService.checkReqUpdateValues(paramsUpdate)) throw ApiError.BadRequest("Invalid values", "err28")

            try {
                json = fs.readFileSync(paramsUpdate.pathToFile, "utf-8")
            } catch (e) {
                throw ApiError.ErrorReadFile("err22")
            }

            if (!json) throw ApiError.ErrorReadFile("err23")

            let resultObj: null | { newData: FileAvitoI, dataWasBeenChanged: string[]} = null

            try {
                resultObj = this.updateObject(JSON.parse(json), paramsUpdate)
            } catch (e) {
                throw e
            }

            if (!resultObj) throw ApiError.ErrorUpdateFile("err25")
            if(resultObj.dataWasBeenChanged.length === 0) throw ApiError.BadRequest("err34")

            try {
                fs.writeFileSync(paramsUpdate.pathToFile, JSON.stringify(resultObj.newData))
            } catch (e) {
                throw ApiError.ErrorSavedFile("err26")
            }

            return "data has been changed"
        } catch (e) {
            throw e
        }
    }


    private updateObject(oldData: FileAvitoI, paramsUpdate: ReqUpdateAvitoType): { newData: FileAvitoI, dataWasBeenChanged: string[] } {
        try {

            let newData: FileAvitoI = oldData
            let dataWasBeenChanged: any[] = []

            //map to params
            paramsUpdate.updateValues.forEach((upValues: UpdateAvitoValuesType) => {

                //search object
                for (let i = 0; i < newData.Ads.Ad.length; i++) {

                    if (newData.Ads.Ad[i]["Id"]._text == upValues.id) {
                        //Change object
                        for (let key in newData.Ads.Ad[i]) {

                            if (key === upValues.key) {                                
                                if (upValues.tag) {                                    
                                    //images has atrr
                                    //@ts-ignore
                                    if (upValues.key === "Images") {
                                        //@ts-ignore upValues.values[iTeg]
                                        let images = []
                                        //create array images
                                        for (let iImg = 0; iImg < upValues.values.length; iImg++) {
                                            images.push({ _attributes: { url: upValues.values[iImg] } })
                                        }
                                        
                                        //@ts-ignore                                                
                                        newData.Ads.Ad[i][key][upValues.tag] = images
                                        
                                        dataWasBeenChanged.push(upValues.id)
                                    } else {
                                        let tags = []
                                        //create array images
                                        for (let iTag = 0; iTag < upValues.values.length; iTag++) {
                                            
                                            tags.push( { _text: upValues.values[iTag] })
                                        }

                                        //@ts-ignore        
                                        newData.Ads.Ad[i][key][upValues.tag] = tags
                                        dataWasBeenChanged.push(upValues.id)
                                    }


                                } else {
                                    //@ts-ignore
                                    newData.Ads.Ad[i][key]._text = upValues.values[0]
                                    dataWasBeenChanged.push(upValues.id)
                                }
                            }
                        }
                    }
                }
            })
            return { newData, dataWasBeenChanged }
        } catch (e) {
            throw ApiError.ErrorUpdateFile("err24")
        }
    }
}


export default new UpdateData()