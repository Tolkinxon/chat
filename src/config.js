const c = require('config');

const serverConfig = {
    PORT: c.get('PORT') || 4000
}

module.exports = serverConfig;