const c = require('ansi-colors')
const md = require('@mithray/md-terminal')

function prettyPrint(str) {
    str = md(str)
    //    str = c.green(str)
    //console.log('\n\t' + md(color_str).trim() + '\n')
    //  console.log(md(color_str).trim())
    console.log(md('```\n' + str + '\n```'))
}

module.exports = prettyPrint
