const setupConfigstore = require('../helpers/setupConfigstore.js')
const decrypt = require('cryptsec').decrypt
const getAuthenticated = require('../interaction/getAuthenticated.js')

async function has(key) {
    if (!(await getAuthenticated())) {
        return
    }
    encryption_key = process.env.SONGSHU_ENCRYPTION_KEY
    config = await setupConfigstore()
    let decrypted_property_key
    let encrypted_property_key
    let hasPropertyKey
    let all = config.all
    for (let prop in all) {
        decrypted_property_key = await decrypt(prop, encryption_key)
        if (decrypted_property_key === key) {
            encrypted_property_key = prop
            break
        }
    }

    hasPropertyKey = config.has(encrypted_property_key)

    return hasPropertyKey
}

module.exports = has
