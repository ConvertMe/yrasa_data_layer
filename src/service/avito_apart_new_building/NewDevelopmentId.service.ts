import axios from "axios"
import path from "path"
import fs from "fs"
//https://autoload.avito.ru/format/New_developments.xml
class NewDevelopmentIdService {
  async getAndSaveIds() {		
    try {
      setInterval(async () => {
        try {
          await axios.get('https://autoload.avito.ru/format/New_developments.xml', {responseType: 'blob'}).then(response => {
            fs.writeFile(path.join(__dirname, "..", "..", "settings", "avito", "New_developments.xml"), response.data, (err) => {
                if (err) return console.error(err)
                console.log('The file has been saved!')
            })
        })
        } catch (e) {
            console.error("error saved developments")
        }
      }, (168*60*60*1000))

    } catch (e) {
      console.error("Error interval developments")
    }
  }
}
export default new NewDevelopmentIdService()