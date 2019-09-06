const Configstore = require('configstore')
const packageJson = require('../package.json')
const config = new Configstore(packageJson.name)

async function path() {
    try {
        let encryption_key =
            (await process.env.SONGSHU_KEY) || (await promptPassword())
        return config.path
    } catch (e) {
        return
    }
}

module.exports = path
