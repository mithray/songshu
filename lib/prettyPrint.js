const c = require('ansi-colors')
const md = require('@mithray/md-terminal')

default_options = {
    markdown: true,
    box: false
}

function pretty(str, options = default_options) {
    if (!str) {
        str = '<' + typeof str + '>'
    }
    str = md(str)
    //    str = c.green(str)
    //console.log('\n\t' + md(color_str).trim() + '\n')
    //  console.log(md(color_str).trim())
    return md('```\n' + str + '\n```')
}

module.exports = pretty
