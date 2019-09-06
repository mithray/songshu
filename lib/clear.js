const Configstore = require('configstore')
const packageJson = require('../package.json')
const config = new Configstore(packageJson.name)

async function clear() {
    let encryption_key =
        (await process.env.SONGSHU_KEY) || (await promptPassword())
    config.clear()
}

module.exports = clear
