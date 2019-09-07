const fs = require('fs')
const Configstore = require('configstore')
const fileData = fs.readFileSync('./package.json', 'utf8')
const packageJson = JSON.parse(fileData)
const config = new Configstore(packageJson.name)
const getEncryptedPropertyKey = require('./getEncryptedPropertyKey.js')

async function del(plaintext_key) {
    let encryption_key =
        (await process.env.SONGSHU_KEY) || (await promptPassword())
    process.env.SONGSHU_KEY = encryption_key
    let encrypted_property_key = getEncryptedPropertyKey(plaintext_key)
    config.delete(encrypted_property_key)
    return
}

module.exports = del
