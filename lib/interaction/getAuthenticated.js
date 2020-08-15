const promptPassword = require('./promptPassword.js')

async function getAuthenticated() {
    let encryption_key =
        (await process.env.SONGSHU_ENCRYPTION_KEY) || (await promptPassword())
    console.log(encryption_key)
    if (encryption_key) {
        process.env.SONGSHU_ENCRYPTION_KEY = encryption_key
        return true
    } else {
        return false
    }
}

module.exports = getAuthenticated
