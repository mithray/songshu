const fs = require('fs')
const Configstore = require('configstore')
const fileData = fs.readFileSync('./package.json', 'utf8')
const packageJson = JSON.parse(fileData)
const config = new Configstore(packageJson.name)

async function path() {
    try {
        let encryption_key =
            (await process.env.SONGSHU_ENCRYPTION_KEY) ||
            (await promptPassword())
        process.env.SONGSHU_ENCRYPTION_KEY = encryption_key
        return config.path
    } catch (e) {
        return
    }
}

module.exports = path
