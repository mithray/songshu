const fs = require('fs')
const Configstore = require('configstore')
const fileData = fs.readFileSync('./package.json', 'utf8')
const packageJson = JSON.parse(fileData)
const inquirer = require('inquirer')
const promptPassword = require('./promptPassword')
const c = require('ansi-colors')
const config = new Configstore(packageJson.name)
//const getEncryptedPropertyKey = require('./lib/getEncryptedPropertyKey.js')
const set = require('./set.js')
const get = require('./get.js')
const checkAuthenticated = require('./checkAuthenticated.js')

async function getSet(plaintext_keys) {
    let return_as_string = true
    if (typeof keys === 'string') {
        return_as_string = true
    } else {
        return_as_string = false
    }
    if (!(await checkAuthenticated())) {
        return
    }

    /*
    console.log(process.env)
    console.log('process.env')
    console.log(encryption_key)
    console.log('plaintext_keys')
    console.log(plaintext_keys)
    */
    plaintext_keys = [plaintext_keys].flat()

    let values = []
    //    plaintext_keys.forEach(async plaintext_key => {
    for (let plaintext_key in plaintext_keys) {
        plaintext_key = plaintext_keys[plaintext_key]
        var plaintext_val = await get(plaintext_key)
        if (plaintext_val) {
            values.push(plaintext_val)
        } else {
            let plaintext_val = await inquirer
                .prompt([
                    {
                        type: 'input',
                        message: `Enter a value for "${plaintext_key}"`,
                        name: plaintext_key
                    }
                ])
                .then(async answers => {
                    await set(plaintext_key, answers[plaintext_key])
                    return answers[plaintext_key]
                })
            values.push(plaintext_val)
        }
    }
    return values
}

module.exports = getSet
