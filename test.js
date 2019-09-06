const questions = require('./lib/questions.js')
const Songshu = require('./index.js')
const songshu = new Songshu('songshustore')

let some_key = 'a12'
let some_val = '1234'
obj = {
    a: 0,
    b: 1,
    c: 2,
    d: 3,
    e: 4
}

async function populateData(obj) {
    for (let key in obj) {
        res = await songshu.set(key, obj[key])
    }
    return res
}
async function add() {
    let abc = await songshu.getSet('def')
    return abc
}

add()
    .then(res => {
        return songshu.all
    })
    .then(res => {
        console.log(res)
    })

/*
populateData(obj)
songshu.has(some_key).then(val => {
    console.log(val)
})
songshu
    .set(some_key, some_val)
    .then(val => {
        return songshu.get(some_key)
    })
    .then(val => {
        console.log(val)
    })
 */
