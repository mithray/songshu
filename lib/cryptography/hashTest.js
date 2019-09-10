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
    let ms_to_test = 10000
    let padded = padString('abc')
    let frame_idx = 0
    let count = 0
    let start_time = Date.now()
    let elapsed_time = 0
    let bar_length = 40
    let hash_per_second = 0
    let lastInterval = false
    let testing = 'calculating your hash power'
    let gap = ' '.repeat(bar_length - testing.length)
    let test_complete = false
    async function update(percent) {
        hash_per_second = (await (count * difficulty)) / (elapsed_time / 1000)
        let progress = dot.repeat(percent / (100 / bar_length)) + arrow
        hps_format = await toSi(hash_per_second)
        const frame = frames[(frame_idx = ++frame_idx % frames.length)]
        let empty_progress = (gap + testing).substring(progress.length)
        if (percent > 0 && percent < 26) progress = c.redBright(progress)
        if (percent > 25 && percent < 51) progress = c.yellow(progress)
        if (percent > 50 && percent < 76) progress = c.green(progress)
        if (percent > 75) progress = c.blue(progress)
        let frm = c.green(frame) + '    '
        if (test_complete) {
            progress = c.dim(progress)
        }
        let bar = lb + progress + c.dim(empty_progress) + rb + ' '
        let prc = percent + '%'

        let message = 'Your hashing power is: '
        let msg = c.dim(message)
        if (test_complete) {
            msg = c.bold(message)
        }
        let hps_speed = c.greenBright(hps_format)

        let top_line = frm + bar + prc
        let bottom_line = msg + hps_speed

        logUpdate(`
    ${top_line}

            ${bottom_line}
`)
    }
    let interval = setInterval(async () => {
        let percent = Math.floor((100 * elapsed_time) / ms_to_test)
        update(percent)
    }, 80)

    while (true) {
        elapsed_time = Date.now() - start_time
        if (elapsed_time > ms_to_test) {
            test_complete = true
            update(100)
            break
        }
        let hash = await getHash(padded, difficulty)
        count++
        elapsed_time = Date.now() - start_time
    }
    clearInterval(interval)
    logUpdate.clear()
}
function printTable(hps) {
    let data = []
    for (let i = 15; i < 25; i++) {
        let password_difficulty = 2 + sub(i)
        let hps_format = Number(formatNumber(2 ** i / hps))
        data.push({
            'Password Difficulty': password_difficulty,
            'Seconds to Hash': hps_format
        })
    }
    console.table(data)
}
function formatNumber(number) {
    let str = number.toString()
    str = str.replace(/\.([0-9]{4}).*/, '.$1')
    str = ' '.repeat(2 - (str.length - 6)) + str
    return str
}

module.exports = hashTest
