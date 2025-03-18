const jwt = require('jsonwebtoken')
const KeyTokenModel = require('../models/keyTokenModel')

const verifyToken = async (req, res, next) => {
    try {
        // gửi jwtToken bằng http header Authorization
        const authHeader = req.headers.authorization

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                status: 'error',
                message: 'Unauthorized',
                data: null
            })
        }

        const token = authHeader.split(" ")[1]

        const userId = req.body.userId

        if (!userId) {
            return res.status(401).json({
                status: 'error',
                message: 'Unauthorized',
                data: null
            })
        }

        const foundKeyToken = await KeyTokenModel.findKeyTokenByUserId(userId)

        if (!foundKeyToken) {
            return res.status(401).json({
                status: 'error',
                message: 'Unauthorized',
                data: null
            })
        }

        const publicKey = foundKeyToken.PublicKey

        jwt.verify(token, publicKey, (err, decoded) => {
            if (err) {
                return res.status(403).json({
                    status: 'error',
                    message: 'Forbidden',
                    data: null
                })
            }

            req.user = decoded
            next()
        })
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Login failed',
            data: error
        })
    }
}

module.exports = verifyToken