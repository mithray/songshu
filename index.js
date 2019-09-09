const basic = require('./lib/basic/basic.js')
const interaction = require('./lib/interaction/interaction.js')
const helpers = require('./lib/helpers/helpers.js')

function songshu(name) {
    this.name = name
    this.encryptionKey = process.env.SONGSHU_ENCRYPTION_KEY

    this.set = basic.set
    this.get = basic.get
    this.has = basic.has
    this.delete = basic.delete
    this.clear = basic.clear
    this.size = basic.size
    this.path = basic.path
    this.all = basic.all

    this.getSet = basic.getSet
    this.getEncryptedPropertyKey = helpers.getEncryptedPropertyKey

    this.prettyPrint = interaction.prettyPrint
    /*
    this.reKey = cryptography.reKey
    this.start = interaction.start
    */
}

module.exports = songshu
