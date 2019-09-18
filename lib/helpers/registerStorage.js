const Songshu = require('../../index.js')
const readPkgUp = require('read-pkg-up')

async function registerStorage() {
    const packageJson = await readPkgUp()
    const songshu = new Songshu(packageJson.name)

    return songshu
}

module.exports = registerStorage
