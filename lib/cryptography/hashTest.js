const logUpdate = require('log-update')
const padString = require('./padString.js')
const getHash = require('./getHash.js')
const c = require('ansi-colors')
const si = require('si-tools')
const sub = require('subsup').sub
const sup = require('subsup').sup

const frames = [
    '⠁',
    '⠁',
    '⠉',
    '⠙',
    '⠚',
    '⠒',
    '⠂',
    '⠂',
    '⠒',
    '⠲',
    '⠴',
    '⠤',
    '⠄',
    '⠄',
    '⠤',
    '⠠',
    '⠠',
    '⠤',
    '⠦',
    '⠖',
    '⠒',
    '⠐',
    '⠐',
    '⠒',
    '⠓',
    '⠋',
    '⠉',
    '⠈',
    '⠈'
]
//let complete = '=≔͇⦀▶‣⦀❘i=͇=➤⇛   ➤ «»⫼ ⫸⦀⦀⦀⦀＝‗❚❚➤❚❙➤‣▶❘▶ ⦑⦒❰❱ ⟪⟫ ⦗ ⦘ • · ⁛ ⸭ ⁙ ⁖  ܲ ▶  ܲ ܲ ܲܲܲ⸩ ⦅⦆⸨⸩❨❩⟮⟯❪❫﴾﴿｟｠⸩◖◗▶'
let dot = '⁙'
let arrow = '◗'
let lb = '⦗'
let rb = '⦘'

async function toSi(number) {
    let siunits
    try {
        siunits =
            (await si.format(number).replace(/([0-9]*)\.[0-9]*/, '$1')) + 'h/s'
    } catch {}
    return siunits
}

async function hashTest() {
    let difficulty = 2 ** 14
    let ms_to_test = 2000
    let padded = padString('abc')
    let i = 0
    let count = 0
    let start_time = Date.now()
    let elapsed_time = 0
    let bar_length = 40
    let hash_per_second = 0
    let interval = setInterval(async () => {
        hash_per_second = (await (count * difficulty)) / (elapsed_time / 1000)
        hps_format = await toSi(hash_per_second)
        let percent = Math.floor((100 * elapsed_time) / ms_to_test)
        let progress = dot.repeat(percent / (100 / bar_length)) + arrow
        let testing = 'calculating hash power'
        let gap = ''
        try {
            gap = ' '.repeat(bar_length - testing.length)
        } catch {}
        let empty_progress = (gap + testing).substring(progress.length)
        if (percent > 0 && percent < 26) progress = c.redBright(progress)
        if (percent > 25 && percent < 51) progress = c.yellow(progress)
        if (percent > 50 && percent < 76) progress = c.green(progress)
        if (percent > 75) progress = c.blue(progress)
        const frame = frames[(i = ++i % frames.length)]
        logUpdate(`
    ${c.green(frame)}\t${lb}${progress}${c.dim(
            empty_progress
        )}${rb} ${percent}% ${c.green(hps_format)}
`)
        /*
    ${frame} ...testing hash speed with argon2id... ${frame}
         */
    }, 80)
    while (true) {
        elapsed_time = Date.now() - start_time
        if (elapsed_time > ms_to_test) break
        let hash = await getHash(padded, difficulty)
        count++
        elapsed_time = Date.now() - start_time
    }

    clearInterval(interval)
    logUpdate.clear()
    hash_per_second = (count * difficulty) / (elapsed_time / 1000)
    //console.log('hps1: ' + hash_per_second)
    hps_format =
        si.format(hash_per_second).replace(/([0-9]*)\.[0-9]*/, '$1') + 'h/s'
    let hps_units = hps_format.replace(/[0-9]*(.*)/, '$1')
    let hps_numbers = hps_format.replace(/([0-9]*).*/, '$1')
    console.log(
        `\n\t${lb} Hashing power is ${c.green.bold(hps_numbers) +
            c.greenBright.dim(hps_units)} ${rb}\n`
    )
    /*
    for (let i = 15; i < 25; i++) {
        console.log(
            `A password hashed ${c.green(
                2 + sup(i)
            )} times will take an estimated ${c.green(
                formatNumber(2 ** i / hash_per_second)
            )} seconds to hash.`
        )
    }
    */
}
function formatNumber(number) {
    let str = number.toString()
    str = str.replace(/\.([0-9]{4}).*/, '.$1')
    str = ' '.repeat(2 - (str.length - 6)) + str
    return str
}

module.exports = hashTest
