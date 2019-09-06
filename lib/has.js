const promptPassword = require('./promptPassword')
const c = require('ansi-colors')
const Configstore = require('configstore')
const packageJson = require('../package.json')
const config = new Configstore(packageJson.name)
const decrypt = require('./decrypt.js')

async function has(key) {
    let encryption_key =
        (await process.env.SONGSHU_KEY) || (await promptPassword())
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
