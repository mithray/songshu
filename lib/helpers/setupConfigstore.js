const fs = require('fs')
const Configstore = require('configstore')

async function setupConfigstore() {
    const fileData = fs.readFileSync('./package.json', 'utf8')
    const packageJson = JSON.parse(fileData)
    const config = new Configstore(packageJson.name)

    return config
}

module.exports = setupConfigstore
