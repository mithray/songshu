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

async function getSet(plaintext_key, val) {
    let encryption_key =
        (await process.env.SONGSHU_ENCRYPTION_KEY) || (await promptPassword())
    process.env.SONGSHU_ENCRYPTION_KEY = encryption_key
    console.log(process.env)
    console.log('process.env')
    console.log(encryption_key)

    console.log(plaintext_key)
    let plaintext_val = await get(plaintext_key)
    console.log('plaintext_keyend')
    if (plaintext_val) {
        return plaintext_val
    } else {
        inquirer
            .prompt([
                {
                    type: 'input',
                    message: `Enter a value for "${plaintext_key}"`,
                    name: plaintext_key
                }
            ])
            .then(answers => {
                console.log(
                    `${c.green(plaintext_key)}: ${answers[plaintext_key]}`
                )
                set(plaintext_key, answers[plaintext_key])
            })
    }
}

module.exports = getSet
