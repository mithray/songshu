const setupConfigstore = require('../helpers/setupConfigstore.js')
const getAuthenticated = require('../interaction/getAuthenticated.js')

async function clear() {
    if (!(await getAuthenticated())) return
    let encryption_key = process.env.SONGSHU_ENCRYPTION_KEY
    config = await setupConfigstore()
    config.clear()
    return
}

module.exports = clear
