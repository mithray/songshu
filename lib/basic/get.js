const setupConfigstore = require('../helpers/setupConfigstore.js')
const decrypt = require('cryptsec').decrypt
const getAuthenticated = require('../interaction/getAuthenticated.js')

async function get(keys) {
    let return_as_string = false
    if (typeof keys === 'string') {
        return_as_string = true
    }

    if (!(await getAuthenticated())) return

    let encryption_key = process.env.SONGSHU_ENCRYPTION_KEY

    config = await setupConfigstore()

    keys = [keys].flat()
    let decrypted_property_key
    let encrypted_property_key
    let all = config.all
    if (Object.keys(all).length < 1) return
    var values = []

    for (let i = 0; i < keys.length; i++) {
        let key = keys[i]
        for (let prop in all) {
            decrypted_property_key = await decrypt(prop, encryption_key)
            if (decrypted_property_key === key) {
                encrypted_property_key = prop
                break
            }
        }
        if (encrypted_property_key) {
            encrypted_property_val = await config.get(encrypted_property_key)
            let decrypted_property_val = await decrypt(
                encrypted_property_val,
                encryption_key
            )

            values.push(decrypted_property_val)
        } else {
            //            console.log(`\n\tKey ${c.green.bold(key)} not found\n`)
            values.push(undefined)
        }
    }
    if (return_as_string === true) {
        return values[0]
    } else {
        return values
    }
}
module.exports = get
