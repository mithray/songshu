const setupConfigstore = require('../helpers/setupConfigstore.js')
const getAuthenticated = require('../interaction/getAuthenticated.js')

async function path() {
    if (!(await getAuthenticated())) return
    let encryption_key = process.env.SONGSHU_ENCRYPTION_KEY
    config = await setupConfigstore()

    return config.path
}

module.exports = path
