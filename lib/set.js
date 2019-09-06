const promptPassword = require('./promptPassword')
const Configstore = require('configstore')
const packageJson = require('../package.json')
const config = new Configstore(packageJson.name)
const encrypt = require('./encrypt.js')
const c = require('ansi-colors')
const songshu = require('../index.js')
const decrypt = require('./decrypt.js')
const getEncryptedPropertyKey = require('./getEncryptedPropertyKey.js')

async function set(plaintext_key, val) {
    let encryption_key
    let encrypted_key
    let encrypted_value
    let encKey

    encryption_key = (await process.env.SONGSHU_KEY) || (await promptPassword())
    try {
        encrypted_value = encrypt(val, encryption_key)
        encKey = await getEncryptedPropertyKey(plaintext_key)
        encrypted_key = encKey ? encKey : encrypt(plaintext_key, encryption_key)
        config.set(encrypted_key, encrypted_value)
    } catch (e) {
        console.info(`Data not adding because failed to encrypt as requested`)
        console.log(e)
    }
    return
}

module.exports = set
