const Configstore = require('configstore')
const fs = require('fs')
const fileData = fs.readFileSync('./package.json', 'utf8')
const packageJson = JSON.parse(fileData)
const config = new Configstore(packageJson.name)
const promptPassword = require('./promptPassword.js')

async function size() {
    let encryption_key =
        (await process.env.SONGSHU_ENCRYPTION_KEY) || (await promptPassword())
    process.env.SONGSHU_ENCRYPTION_KEY = encryption_key
    return config.size
}

module.exports = size
