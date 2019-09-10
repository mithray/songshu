const crypto = require('crypto')
const argon2 = require('argon2')
const inquirer = require('inquirer')

async function argonHash(password) {
    const hash = await argon2.hash(password, {
        type: argon2.argon2id,
        memoryCost: 2 ** 18,
        hashLength: 32,
        salt: Buffer.from(
            "This buffer is defined in order to give the user deterministic password generation for local access. It shouldn't be used outside the local environment."
        )
    })
    return hash
}

async function getHash(password) {
    let sha_hasher = await crypto.createHash('sha256')
    let argon_hash = await argonHash(password)
    let sha_hash = await sha_hasher
        .update(argon_hash)
        .digest()
        .toString('hex')
    return sha_hash
}

module.exports = getHash