const Configstore = require('configstore')
const packageJson = require('../package.json')
const config = new Configstore(packageJson.name)
const getEncryptedPropertyKey = require('./getEncryptedPropertyKey.js')

async function del(plaintext_key) {
    let encryption_key =
        (await process.env.SONGSHU_KEY) || (await promptPassword())
    let encrypted_property_key = getEncryptedPropertyKey(plaintext_key)
    config.delete(encrypted_property_key)
    return
}

module.exports = del
