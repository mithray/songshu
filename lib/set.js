const emoji = require('node-emoji')
const Configstore = require('configstore')
const fs = require('fs')
const fileData = fs.readFileSync('./package.json', 'utf8')
const packageJson = JSON.parse(fileData)
const promptPassword = require('./promptPassword')
const config = new Configstore(packageJson.name)

const encrypt = require('./encrypt.js')
const c = require('ansi-colors')
const songshu = require('../index.js')
const decrypt = require('./decrypt.js')
const getEncryptedPropertyKey = require('./getEncryptedPropertyKey.js')

async function set(plaintext_key, plaintext_val) {
    if (!plaintext_val) {
        console.info(
            `\n\t${c.bold('You must provide a key ') +
                c.bold.italic.green('and') +
                c.bold(' a value as arguments')}\n`
        )
        return
    }
    let encryption_key
    let encrypted_key
    let encrypted_value
    let encKey

    encryption_key =
        (await process.env.SONGSHU_ENCRYPTION_KEY) || (await promptPassword())
    if (encryption_key) {
        process.env.SONGSHU_ENCRYPTION_KEY = encryption_key
    } else {
        return false
    }
    try {
        encrypted_value = encrypt(plaintext_val, encryption_key)
        encKey = await getEncryptedPropertyKey(plaintext_key)
        encrypted_key = encKey ? encKey : encrypt(plaintext_key, encryption_key)
        config.set(encrypted_key, encrypted_value)

        console.info(
            c.bold('\n\tKey ') +
                c.bold.green(plaintext_key) +
                c.bold(' has been set to value ') +
                c.bold.green(plaintext_val) +
                c.bold(', encrypted, and stored\n')
        )

        return true
    } catch (e) {
        console.info(
            `\n\t${c.bold(
                'Not adding because encryption or decryption failed'
            )}\n`
        )

        console.log(emoji.get('chipmunk'))
        console.log(e)
        return false
    }
}

module.exports = set
