import { ServerConfigInterface } from "./types/config.dto";
import c from 'config'
import path from 'node:path'

 const serverConfig:ServerConfigInterface = {
    PORT: c.get('PORT') || 4000,
    TOKEN_KEY: c.get('TOKEN_KEY'),
    dbPath: (fileName:string) => path.join(process.cwd(), 'db', fileName + '.json')
}

export default serverConfig;
