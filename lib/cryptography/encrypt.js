const crypto = require('crypto')
const argon2 = require('argon2')
const padString = require('./padString.js')

function encrypt(plaintext, key) {
    //    console.log(plaintext)
    plaintext = plaintext.toString()
    plaintext = padString(plaintext, (chunkLength = 16))
    const algorithm = 'aes-256-xts'
    const iv = Buffer.alloc(16, 0)
    try {
        const cipher = crypto.createCipheriv(algorithm, key, iv)
        let ciphertext = cipher.update(plaintext, 'utf8', 'hex')
        ciphertext += cipher.final('hex')
        return ciphertext
    } catch (e) {
        console.log(e)
        return
    }
}

module.exports = encrypt
