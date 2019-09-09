const setupConfigstore = require('../helpers/setupConfigstore.js')
const promptPassword = require('../interaction/promptPassword.js')
const getAuthenticated = require('../interaction/getAuthenticated.js')

async function size() {
    if (!(await getAuthenticated())) return
    let encryption_key = process.env.SONGSHU_ENCRYPTION_KEY
    config = await setupConfigstore()

    return config.size
}

module.exports = size
