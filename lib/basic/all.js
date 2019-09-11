const setupConfigstore = require('../helpers/setupConfigstore.js')
const decrypt = require('cryptsec').decrypt
const getAuthenticated = require('../interaction/getAuthenticated.js')

async function all() {
    if (!(await getAuthenticated())) return
    let encryption_key = process.env.SONGSHU_ENCRYPTION_KEY
    let config = await setupConfigstore()

    let decrypted_property_key
    let decrypted_property_val
    let decrypted_all = {}
    let all = config.all
    for (let prop in all) {
        decrypted_property_key = await decrypt(prop, encryption_key)
        decrypted_property_val = await decrypt(prop, encryption_key)
        decrypted_all[decrypted_property_key] = decrypted_property_val
    }

    return decrypted_all
}

module.exports = all
