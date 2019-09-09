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
    return str
}

module.exports = pretty
