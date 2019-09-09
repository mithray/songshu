const setupConfigstore = require('../helpers/setupConfigstore.js')
const getEncryptedPropertyKey = require('../helpers/getEncryptedPropertyKey.js')
const getAuthenticated = require('../interaction/getAuthenticated.js')

async function del(plaintext_key) {
    if (!(await getAuthenticated())) {
        return
    }
    encryption_key = process.env.SONGSHU_ENCRYPTION_KEY
    const config = await setupConfigstore()
    let encrypted_property_key = await getEncryptedPropertyKey(plaintext_key)
    config.delete(encrypted_property_key)
    return
}

module.exports = del
