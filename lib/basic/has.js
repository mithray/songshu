const promptPassword = require('./promptPassword')
const c = require('ansi-colors')
const fs = require('fs')
const Configstore = require('configstore')
const fileData = fs.readFileSync('./package.json', 'utf8')
const packageJson = JSON.parse(fileData)
const config = new Configstore(packageJson.name)
const decrypt = require('./decrypt.js')
const checkAuthenticated = require('./checkAuthenticated.js')

async function has(key) {
    if (!(await checkAuthenticated())) {
        return
    }
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
