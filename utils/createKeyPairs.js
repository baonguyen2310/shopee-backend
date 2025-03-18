const crypto = require('crypto')

const createKeyPairs = () => {
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

    return {
        privateKey,
        publicKey
    }
}



module.exports = {
    createKeyPairs
}