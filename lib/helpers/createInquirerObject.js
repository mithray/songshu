const c = require('ansi-colors')
function createInquirerObject(plaintext_key) {
    const obj = {
        type: 'input',
        message: `Enter a value to save for "${c.green.bold(plaintext_key)}": `,
        name: plaintext_key
    }
    return obj
}

module.exports = createInquirerObject
