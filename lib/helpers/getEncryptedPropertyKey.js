const fs = require('fs')

const setupConfigstore = require('./setupConfigstore.js')
const decrypt = require('../cryptography/decrypt.js')
const getAuthenticated = require('../interaction/getAuthenticated.js')

async function getEncryptedPropertyKey(plaintext_property_key) {
    if (!(await getAuthenticated())) {
        return
    }
    let encryption_key = process.env.SONGSHU_ENCRYPTION_KEY
    const config = await setupConfigstore()
    let decrypted_property_key
    let encrypted_property_key
    let all = config.all
    for (let prop in all) {
        decrypted_property_key = await decrypt(prop, encryption_key)
        if (decrypted_property_key === plaintext_property_key) {
            encrypted_property_key = prop
            break
        }
    }
    if (encrypted_property_key) {
        return encrypted_property_key
    } else {
        return false
    }
    // return encrypted_property_key || false
}

module.exports = getEncryptedPropertyKey
