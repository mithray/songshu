const Configstore = require('configstore')
const packageJson = require('../package.json')
const config = new Configstore(packageJson.name)
const promptPassword = require('./promptPassword.js')

async function size() {
    let encryption_key =
        (await process.env.SONGSHU_KEY) || (await promptPassword())
    return config.size
}

module.exports = size
