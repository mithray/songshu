const nacl = require('tweetnacl')
/*
function oldPadString(inputData, length = 8) {
    inputData = Buffer.from(inputData, 'utf8').toString('hex')
    const bitLength = inputData.length * length
    if (bitLength < 256) {
        for (i = bitLength; i < 256; i += length) {
            inputData += 0
        }
    } else if (bitLength > 256) {
        while ((inputData.length * length) % 256 != 0) {
            inputData += 0
        }
    }
    inputData = Buffer.from(inputData, 'hex').toString('utf8')
    return inputData
}
*/
function padString(inputData, chunkLength = 16) {
    //  console.log(inputData)
    let inputDataLength = Buffer.byteLength(inputData)
    let randomBytesLength = chunkLength - (inputDataLength % chunkLength) - 1
    let randomBytes = nacl.randomBytes(randomBytesLength)
    let randomString = Buffer.from(randomBytes).toString('hex')
    inputData = inputData + '␛' + randomString
    //    console.log(inputData)
    return inputData
}

module.exports = padString
