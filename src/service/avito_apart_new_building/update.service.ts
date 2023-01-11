import fs from "fs"
import path from "path"
import {AvitoFeedI, FileAvitoI} from "../../settings/types"
import { ReqUpdateAvitoType, UpdateAvitoValuesType } from "../../controllers/types"
import ApiError from "../../exceptions/api-error"



class UpdateData {

    async update(paramsUpdate: ReqUpdateAvitoType) {
        try {
            if(!paramsUpdate || !paramsUpdate.pathToFile) throw ApiError.BadRequest("Invalid path", "err 21")
            let json: null | string = null

            try {
                json = fs.readFileSync(paramsUpdate.pathToFile, "utf-8")
            } catch (e) {
                throw ApiError.ErrorReadFile("err 22")
            }
            
            if(!json) throw ApiError.ErrorReadFile("err 23")

            let obj = JSON.parse(json)
            //@ts-ignore
            console.log(this.updateObject(obj, paramsUpdate).newData.Ads.Ad[0].Images?.Image)

/* 
            const resultObj = JSON.stringify(obj)
            fs.writeFileSync(__dirname + "/test.json", resultObj)
            console.log(fs.readFileSync(__dirname + "/test.json", "utf-8")) */
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

                                            //@ts-ignore
                                            newData.Ads.Ad[i][key][upValues.teg][iTeg]["_attributes"][upValues.attr]
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