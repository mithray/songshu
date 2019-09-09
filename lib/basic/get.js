const promptPassword = require('./promptPassword')
const fs = require('fs')
const Configstore = require('configstore')
const fileData = fs.readFileSync('./package.json', 'utf8')
const packageJson = JSON.parse(fileData)
const config = new Configstore(packageJson.name)
const decrypt = require('./decrypt.js')
const c = require('ansi-colors')
const checkAuthenticated = require('./checkAuthenticated.js')

async function get(keys) {
    let return_as_string = true
    if (typeof keys === 'string') {
        return_as_string = true
    } else {
        return_as_string = false
    }
    if (!(await checkAuthenticated())) {
        return
    }

    keys = [keys].flat()
    let decrypted_property_key
    let encrypted_property_key
    let all = config.all
    if (Object.keys(all).length < 1) {
        console.log(c.green('No keys in storage'))
        return
    }
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
