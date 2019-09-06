const inquirer = require('inquirer')
const getHash = require('./getHash.js')
const c = require('ansi-colors')

const password = {
    type: 'password',
    message: 'Enter a password',
    name: 'password',
    mask: c.greenBright('*')
}
async function promptPassword() {
    let encryption_key = inquirer.prompt([password]).then(answers => {
        let encryption_key = getHash(answers.password)
        return encryption_key
    })
    return encryption_key
}

module.exports = promptPassword
