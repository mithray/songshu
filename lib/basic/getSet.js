const inquirer = require('inquirer')
//const getEncryptedPropertyKey = require('./lib/getEncryptedPropertyKey.js')
const set = require('./set.js')
const get = require('./get.js')
const getAuthenticated = require('../interaction/getAuthenticated.js')
const setupConfigstore = require('../helpers/setupConfigstore.js')
const c = require('ansi-colors')

async function getSet(plaintext_keys) {
    let return_as_string = true
    if (typeof keys === 'string') {
        return_as_string = true
    } else {
        return_as_string = false
    }
    if (!(await getAuthenticated())) return
    let encryption_key = process.env.SONGSHU_ENCRYPTION_KEY
    let config = await setupConfigstore()

    plaintext_keys = [plaintext_keys].flat()

    let values = []
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
                        message: `Enter a value to save for "${c.green.bold(
                            plaintext_key
                        )}": `,
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
