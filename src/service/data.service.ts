import fs from "fs"
import path from "path"
import { v1 } from "uuid"
import { execute } from "../db"


class DataService {
    


    private async write (object: any, payloadJwt: any){
    try {
        const oldFileRef = await execute("SELECT ref FROM feedsAvito WHERE userId = ?", [payloadJwt.id]).then(res => res.rows)

        const fileName = v1() + ".data.json"
        fs.writeFileSync(path.join(__dirname, "..", "data", "avito", fileName), JSON.stringify(object))

        const pathToFile = path.join(__dirname, "..", "data", "avito", fileName)

        await execute(`
        INSERT INTO feedsAvito (userId, ref) VALUES (?,?) ON DUPLICATE KEY UPDATE ref=?
        `, [payloadJwt.id, pathToFile, pathToFile])
        
        if(oldFileRef.length > 0) fs.rm(oldFileRef[0]["ref"], {recursive: true}, (err) => {
            if(err) console.log("error deleted")
        })
        
        return "Файл был записан"

    } catch (e) {

    }
   }
}

export default new DataService()