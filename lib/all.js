const promptPassword = require('./promptPassword')
const c = require('ansi-colors')
const Configstore = require('configstore')
const packageJson = require('../package.json')
const config = new Configstore(packageJson.name)
const decrypt = require('./decrypt.js')

async function all(key) {
    let encryption_key =
        (await process.env.SONGSHU_KEY) || (await promptPassword())
    process.env.SONGSHU_ENCRYPTION_KEY = encryption_key
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
