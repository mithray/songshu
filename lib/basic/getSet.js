const inquirer = require('inquirer')
const Joi = require('@hapi/joi')
//const getEncryptedPropertyKey = require('./lib/getEncryptedPropertyKey.js')
const set = require('./set.js')
const get = require('./get.js')
const getAuthenticated = require('../interaction/getAuthenticated.js')
const setupConfigstore = require('../helpers/setupConfigstore.js')
const createValidationFunction = require('../helpers/createValidationFunction.js')
const createInquirerObject = require('../helpers/createInquirerObject.js')
const c = require('ansi-colors')

async function getSet(plaintext_keys, options) {
    let return_as_string = typeof plaintext_keys === 'string' ? true : false
    if (!(await getAuthenticated())) return
    let encryption_key = process.env.SONGSHU_ENCRYPTION_KEY

    plaintext_keys = [plaintext_keys].flat()

    let values = []
    for (let plaintext_key in plaintext_keys) {
        plaintext_key = plaintext_keys[plaintext_key]
        var plaintext_val = await get(plaintext_key)
        if (plaintext_val) {
            values.push(plaintext_val)
        } else {
            let inquirerObject = createInquirerObject(plaintext_key)
            if (options && options.validate) {
                inquirerObject.validate = createValidationFunction(
                    options.validate
                )
            }
            let plaintext_val = await inquirer
                .prompt([inquirerObject])
                .then(async answers => {
                    console.log(
                        `setting ${plaintext_key} to ${answers[plaintext_key]}`
                    )
                    await set(plaintext_key, answers[plaintext_key])
                    return answers[plaintext_key]
                })
            values.push(plaintext_val)
        }
    }
    return values
}

module.exports = getSet
