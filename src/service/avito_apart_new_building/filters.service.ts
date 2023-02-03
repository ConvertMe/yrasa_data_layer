
import { AvitoFeedI } from "../../settings/types"

class FiltersService {

    byId(object: AvitoFeedI[], id: string){
        try {
            console.log(id)
            return object.filter((e) => {
                console.log(e.Id._text === id)
                return e.Id._text === id ? true : false
            })
        } catch (e) {
            throw e
        }
    }
}

export default new FiltersService()