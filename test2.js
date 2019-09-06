const Configstore = require('configstore')
const packageJson = require('./package.json')

const config = new Configstore(packageJson.name)

config.set('a', '0')
config.set('b', '1')
config.set('c', '2')
config.set('d', '3')
//console.log(config.all)
config.delete('a')
//console.log(config.all)
console.log(config.size)

console.log(config.get())
