const c = require('config');
const path = require('node:path');


const serverConfig = {
    PORT: c.get('PORT') || 4000,
    TOKEN_KEY: c.get('TOKEN_KEY'),
    dbPath: (fileName) => path.join(process.cwd(), 'db', fileName + '.json')
}

module.exports = serverConfig;