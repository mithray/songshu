const inquirer = require('inquirer')
const Configstore = require('configstore')
const questions = require('./questions.js')
const packageJson = require('../package.json')
const config = new Configstore(packageJson.name)
const getHash = require('./getHash.js')
const encrypt = require('./encrypt.js')

async function getRequiredQuestions(questions) {
    const requiredQuestions = []
    questions.forEach(question => {
        let already_defined = config.all.hasOwnProperty(question.name)
        if (already_defined) {
            return
        } else {
            requiredQuestions.push(question)
        }
    })

    return requiredQuestions
}

async function promptInfo(questions) {
    var cipher
    var hash
    var encrypted_value
    var questions

    requiredQuestions = await getRequiredQuestions(questions)
    inquirer.prompt(requiredQuestions).then(async answers => {
        if (answers.hasOwnProperty('password')) {
            hash = await getHash(answers.password)
        }
        for (let idx in answers) {
            let value = answers[idx]
            if (answers.hasOwnProperty('password')) {
                console.log(answers[idx])
                try {
                    let encrypted_key = encrypt(idx, hash)
                    let encrypted_value = encrypt(value, hash)
                    config.set(encrypted_key, encrypted_value)
                } catch (e) {
                    console.info(
                        `Data not adding because failed to encrypt as requested`
                    )
                    console.log(e)
                }
            } else {
                config.set(idx, value)
            }
        }
    })
}

module.exports = promptInfo
