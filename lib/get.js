const promptPassword = require('./promptPassword')
const fs = require('fs')
const Configstore = require('configstore')
const fileData = fs.readFileSync('./package.json', 'utf8')
const packageJson = JSON.parse(fileData)
const config = new Configstore(packageJson.name)
const decrypt = require('./decrypt.js')

async function get(keys) {
    let encryption_key =
        (await process.env.SONGSHU_ENCRYPTION_KEY) || (await promptPassword())
    if (!encryption_key) {
        return
    }
    process.env.SONGSHU_ENCRYPTION_KEY = encryption_key

    keys = [keys].flat()
    let decrypted_property_key
    let encrypted_property_key
    let all = config.all
    console.log(all)

    var values = []
    keys.forEach(async key => {
        console.log('key1 ' + key)
        for (let prop in all) {
            console.log(prop)
            console.log('key2 ' + key)
            decrypted_property_key = await decrypt(prop, encryption_key)
            if (decrypted_property_key === key) {
                console.log('key3 ' + key)
                encrypted_property_key = prop
                break
            }
        }
        if (encrypted_property_key) {
            console.log('key4' + key)
            /*
        console.log('encrypted_property_key')
        console.log(encrypted_property_key)
        */
            encrypted_property_val = await config.get(encrypted_property_key)
            //console.log(encrypted_property_val)
            let decrypted_property_val = await decrypt(
                encrypted_property_val,
                encryption_key
            )

            console.log('decrypted_property_val')
            console.log(decrypted_property_val)
            values = values.push(decrypted_property_val)
            console.log('values1')
            console.log(values)
        } else {
            console.log('not found')
            values.push(undefined)
        }
        return values
    })
    console.log('values2')
    console.log(values)
    return values
}
module.exports = get
