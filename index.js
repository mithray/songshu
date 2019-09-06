function songshu(name) {
    this.name = name
    this.set = require('./lib/set.js')
    this.get = require('./lib/get.js')
    this.has = require('./lib/has.js')
    this.delete = require('./lib/delete.js')
    this.clear = require('./lib/clear.js')
    this.size = require('./lib/size.js')()
    this.path = require('./lib/path.js')()
    this.all = require('./lib/all.js')()
    this.getSet = require('./lib/getSet.js')
    this.getEncryptedPropertyKey = require('./lib/getEncryptedPropertyKey.js')
    //    this.reKey()
}

module.exports = songshu
