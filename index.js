const basic = require('./lib/basic/basic.js')
const interaction = require('./lib/interaction/interaction.js')
const helpers = require('./lib/helpers/helpers.js')
const cryptography = require('../cryptsec')
const readPkgUp = require('read-pkg-up')

function Songshu(name) {
    if (name) {
        this.name = name
    } else {
        this.name = readPkgUp.sync().package.name
    }
    this.get = basic.get
    this.all = basic.all
    this.set = basic.set
    this.has = basic.has
    this.delete = basic.delete
    this.clear = basic.clear
    this.size = basic.size
    this.path = basic.path
    this.getSet = basic.getSet
    this.registerStorage = helpers.setupConfigstore
    this.getSetDefault = basic.getSetDefault
    this.hashTest = cryptography.hashTest
    this.stretchPassword = cryptography.getHash
    this.decrypt = cryptography.decrypt
    this.encrypt = cryptography.encrypt
    /*

    this.getEncryptedPropertyKey = helpers.getEncryptedPropertyKey

    this.prettyPrint = interaction.prettyPrint
    this.reKey = cryptography.reKey
    this.start = interaction.start
    this.encryptionKey = process.env.SONGSHU_ENCRYPTION_KEY
    */
}

module.exports = Songshu
