const inquirer = require('inquirer')
const getHash = require('../cryptography/getHash.js')

const password = [
    {
        type: 'password',
        message: 'Enter a password:',
        name: 'password',
        mask: '*'
    },
    {
        type: 'password',
        message: 'Retype password:',
        name: 'password_confirm',
        mask: '*'
    }
]
async function promptPassword() {
    let encryption_key = inquirer.prompt(password).then(answers => {
        if (answers.password === answers.password_confirm) {
            let hash = getHash(answers.password)
            process.env.SONGSHU_ENCRYPTION_KEY = hash
            return hash
        } else {
            console.log('Passwords were not the same')
            return false
        }
    })
    return encryption_key
}
module.exports = promptPassword
