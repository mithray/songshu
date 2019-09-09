const Configstore = require('configstore')
const fs = require('fs')
const fileData = fs.readFileSync('./package.json', 'utf8')
const packageJson = JSON.parse(fileData)
const config = new Configstore(packageJson.name)
const promptPassword = require('./promptPassword.js')
const checkAuthenticated = require('./checkAuthenticated.js')

async function size() {
    if (!(await checkAuthenticated())) {
        return
    }
    return config.size
}

module.exports = size
