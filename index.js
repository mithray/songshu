function songshu(name) {
    this.name = name
    this.encryptionKey = process.env.SONGSHU_ENCRYPTION_KEY
    this.set = require('./lib/set.js')
    this.get = require('./lib/get.js')
    this.has = require('./lib/has.js')
    this.delete = require('./lib/delete.js')
    this.clear = require('./lib/clear.js')
    this.size = require('./lib/size.js')
    this.path = require('./lib/path.js')
    this.all = require('./lib/all.js')
    this.getSet = require('./lib/getSet.js')
    this.getEncryptedPropertyKey = require('./lib/getEncryptedPropertyKey.js')
    /*
    this.reKey = require('./lib/reKey.js')
    this.start = require('./lib/start.js') //interactive menu based secret manager
    */
}

module.exports = songshu
