const inquirer = require('inquirer')
const getHash = require('./getHash.js')
const c = require('ansi-colors')

const password = [
    {
        type: 'password',
        message: 'Enter a password:',
        name: 'password',
        mask: c.greenBright('*')
    },
    {
        type: 'password',
        message: 'Retype password:',
        name: 'password_confirm',
        mask: c.greenBright('*')
    }
]
async function promptPassword() {
    let encryption_key = inquirer.prompt(password).then(answers => {
        if (answers.password === answers.password_confirm) {
            let hash = getHash(answers.password)
            process.env.SONGSHU_ENCRYPTION_KEY = hash
            return hash
        } else {
            console.log(c.green.bold(`\n\tPasswords were not the same\n`))
            return false
        }
    })
    return encryption_key
}
module.exports = promptPassword
