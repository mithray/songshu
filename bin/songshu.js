#!/usr/bin/env node

//const cligen = require('@mithray/bdd-cligen')
const cligen = require('../../bdd-cligen/index.js')
cligen({ path: './spec/api.yml' }).then(program => {
    program.parse(process.argv)
})
