const crypto = require('crypto')
const argon2 = require('argon2')
const inquirer = require('inquirer')

async function decrypt(ciphertext, key) {
    let plaintext
    const algorithm = 'aes-256-xts'
    const iv = Buffer.alloc(16, 0)
    try {
        const decipher = crypto.createDecipheriv(algorithm, key, iv)
        plaintext = decipher.update(ciphertext, 'hex', 'utf8')
        plaintext += decipher.final('utf8')
        plaintext = plaintext.replace(/(.*)␛.*/, '$1')
    } catch {
        console.log(
            `failed to decrypt "${JSON.stringify(ciphertext)}" with key ${key}`
        )
    }
    return plaintext
}

module.exports = decrypt
