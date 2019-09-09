const fs = require('fs')
const Configstore = require('configstore')
const fileData = fs.readFileSync('./package.json', 'utf8')
const packageJson = JSON.parse(fileData)
const config = new Configstore(packageJson.name)
const checkAuthenticated = require('./checkAuthenticated.js')

async function path() {
    if (!(await checkAuthenticated())) {
        return
    }
    return config.path
}

module.exports = path
