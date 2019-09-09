const setupConfigstore = require('../helpers/setupConfigstore.js')
const promptPassword = require('../interaction/promptPassword')

const encrypt = require('../cryptography/encrypt.js')
const decrypt = require('../cryptography/decrypt.js')
const getEncryptedPropertyKey = require('../helpers/getEncryptedPropertyKey.js')
const getAuthenticated = require('../interaction/getAuthenticated.js')

async function set(plaintext_key, plaintext_val) {
    if (!(await getAuthenticated())) return
    if (!plaintext_val) {
        //    log.info('You must provide at least one key and at least one value')
        return
    }
    let encryption_key
    let encrypted_key
    let encrypted_value
    let encKey
    encryption_key = process.env.SONGSHU_ENCRYPTION_KEY
    const config = await setupConfigstore()
    try {
        encrypted_value = encrypt(plaintext_val, encryption_key)
        encKey = await getEncryptedPropertyKey(plaintext_key)
        encrypted_key = encKey ? encKey : encrypt(plaintext_key, encryption_key)
        try {
            config.set(encrypted_key, encrypted_value)
        } catch (e) {
            console.log(`Failed to set ${plaintext_key} to ${plaintext_val}`)
        }

        return
    } catch (e) {
        console.log(e)
        return
    }
}

module.exports = set
