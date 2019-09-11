const inquirer = require('inquirer')
const logUpdate = require('log-update')
const getHash = require('cryptsec').getHash

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

const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']

async function promptPassword() {
    let encryption_key = inquirer.prompt(password).then(async answers => {
        if (answers.password === answers.password_confirm) {
            let i = 0
            interval = setInterval(() => {
                const frame = frames[(i = ++i % frames.length)]
                logUpdate(
                    `\t${frame} ...stretching your password with argon2id... ${frame}`
                )
            }, 80)
            let hash = await getHash(answers.password)
            clearInterval(interval)
            logUpdate.clear()
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
