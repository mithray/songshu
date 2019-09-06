const promptPassword = require('./promptPassword')
const c = require('ansi-colors')
const Configstore = require('configstore')
const packageJson = require('../package.json')
const config = new Configstore(packageJson.name)
const decrypt = require('./decrypt.js')

async function get(key) {
    let encryption_key =
        (await process.env.SONGSHU_KEY) || (await promptPassword())
    let decrypted_property_key
    let encrypted_property_key
    let all = config.all
    for (let prop in all) {
        console.log('prop')
        console.log(prop)
        decrypted_property_key = await decrypt(prop, encryption_key)
        if (decrypted_property_key === key) {
            encrypted_property_key = prop
            break
        }
    }
    if (encrypted_property_key) {
        console.log('encrypted_property_key')
        console.log(encrypted_property_key)
        encrypted_property_val = config.get(encrypted_property_key)
        console.log(encrypted_property_val)
        let decrypted_property_val = await decrypt(
            encrypted_property_val,
            encryption_key
        )

        return decrypted_property_val
    } else {
        return
    }
}
module.exports = get
