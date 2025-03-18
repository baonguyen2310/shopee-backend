const crypto = require('crypto')
const fs = require('fs')

const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
    },
    privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem'
    }
})

fs.writeFileSync("publicKey.pem", publicKey)
fs.writeFileSync("privateKey.pem", privateKey)
