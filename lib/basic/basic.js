const clear = require('./clear.js')
const all = require('./all.js')
/*
 */
const getSetDefault = require('./getSetDefault.js')
const getSet = require('./getSet.js')
const path = require('./path.js')
const size = require('./size.js')
const del = require('./delete.js')
const get = require('./get.js')
const set = require('./set.js')
const has = require('./has.js')

module.exports = {
    all,
    get,
    set,
    has,
    delete: del,
    clear,
    size,
    path,
    getSet,
    getSetDefault
}
