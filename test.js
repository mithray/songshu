const Songshu = require('./index.js')
let songshu = new Songshu()
/*
const Joi = require('@hapi/joi')
const readPkgUp = require('read-pkg-up')
async function registerStorage() {
    const songshu = new Songshu((await readPkgUp()).name)
    return songshu
}
console.log(Object.keys(Songshu))
Songshu.registerStorage().then(storage => {
    storage.getSetDefault('hungry hippos')
})
*/

songshu.getSet(['a', 'ba'], {
    validate: 'Joi.string().min(2)'
})
/*
songshu.stretchPassword('abc').then(res => {
    console.log(res)
})
*/
