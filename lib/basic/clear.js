const fs = require('fs')
const Configstore = require('configstore')
const fileData = fs.readFileSync('./package.json', 'utf8')
const packageJson = JSON.parse(fileData)
const config = new Configstore(packageJson.name)
const checkAuthenticated = require('./checkAuthenticated.js')

async function clear() {
    if (!(await checkAuthenticated())) {
        return
    }
    config.clear()
}

module.exports = clear
