import fs from "fs"
import path from "path"
import {FileAvitoI} from "../../settings/types"
import { ReqUpdateAvitoType, UpdateAvitoValuesType } from "../../controllers/types"
import ApiError from "../../exceptions/api-error"
import checkService from "./check.service"



class UpdateData {

    async update(paramsUpdate: ReqUpdateAvitoType) {
        try {


            if(!paramsUpdate || !paramsUpdate.pathToFile) throw ApiError.BadRequest("Invalid path", "err21")
            let json: null | string = null

            if(!checkService.checkReqUpdateValues(paramsUpdate)) throw ApiError.BadRequest("Invalid values", "err28")

            try {
                json = fs.readFileSync(paramsUpdate.pathToFile, "utf-8")
            } catch (e) {
                throw ApiError.ErrorReadFile("err22")
            }
            
            if(!json) throw ApiError.ErrorReadFile("err23")

            let resultObj: null | {newData: FileAvitoI, dataWasBeenChanged: string[]} = null

            try {
                resultObj = this.updateObject(JSON.parse(json), paramsUpdate)
            } catch (e) {
                throw e
            }

            if(!resultObj) throw ApiError.ErrorUpdateFile("err25")

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


    private updateObject(oldData: FileAvitoI, paramsUpdate: ReqUpdateAvitoType): {newData: FileAvitoI, dataWasBeenChanged: string[]} {
        try {
            
            let newData: FileAvitoI = oldData
            let dataWasBeenChanged: string[] = []

            //map to params
            paramsUpdate.updateValues.forEach((upValues: UpdateAvitoValuesType) => {

                //search object
                for (let i = 0; i < newData.Ads.Ad.length; i++) {

                    if(newData.Ads.Ad[i]["Id"]._text == upValues.id) {
                            //Change object
                            for (let key in newData.Ads.Ad[i]) {

                                if(key === upValues.key) {
                                    if(upValues.attr) { 
                                        //if attribute to find key and push new values
                                        //@ts-ignore
                                        for (let iTeg = 0; iTeg <  newData.Ads.Ad[i][key][upValues.teg].length; iTeg++) {
                                            //images has atrr
                                            //@ts-ignore
                                            if(upValues.key === "Images") {
                                                //@ts-ignore
                                                newData.Ads.Ad[i][key][upValues.teg][iTeg]["_attributes"][upValues.attr] = upValues.values[iTeg]
                                            } else {
                                                //@ts-ignore
                                                newData.Ads.Ad[i][key][upValues.teg][iTeg][upValues.attr]["_text"] = upValues.values[iTeg]
                                            }
                                            dataWasBeenChanged.push(upValues.values[iTeg])
                                        }

                                    } else {
                                    //@ts-ignore
                                    newData.Ads.Ad[i][key]._text = upValues.values[0]
                                    dataWasBeenChanged.push(upValues.values[0])
                                    }
                                }
                            }
                    }
                }
            })

            return {newData, dataWasBeenChanged}
        } catch (e) {
            throw ApiError.ErrorUpdateFile("err24")
        }
    }
}


export default new UpdateData()