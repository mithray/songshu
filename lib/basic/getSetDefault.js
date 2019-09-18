const inquirer = require('inquirer')
const Joi = require('@hapi/joi')
const set = require('./set.js')
const get = require('./get.js')
const getAuthenticated = require('../interaction/getAuthenticated.js')
const setupConfigstore = require('../helpers/setupConfigstore.js')
const createInquirerObject = require('../helpers/createInquirerObject.js')
const createValidationFunction = require('../helpers/createValidationFunction.js')
const c = require('ansi-colors')

async function getSetDefault(plaintext_keys, options) {
    let return_as_string = typeof plaintext_keys === 'string' ? true : false
    if (!(await getAuthenticated())) return
    let encryption_key = process.env.SONGSHU_ENCRYPTION_KEY

    plaintext_keys = [plaintext_keys].flat()

    let values = []
    for (let idx in plaintext_keys) {
        plaintext_key = plaintext_keys[idx]
        let inquirerObject = createInquirerObject(plaintext_key)
        var plaintext_val = await get(plaintext_key)
        if (plaintext_val) {
            inquirerObject.default = plaintext_val
        }
        if (options && options.validate) {
            inquirerObject.validate = createValidationFunction(options.validate)
        }
        plaintext_val = await inquirer
            .prompt([inquirerObject])
            .then(async answers => {
                await set(plaintext_key, answers[plaintext_key])
                return answers[plaintext_key]
            })
        values.push(plaintext_val)
    }
    return values
}

module.exports = getSetDefault
