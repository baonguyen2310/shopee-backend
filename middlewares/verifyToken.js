const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
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

    const secretKey = process.env.SECRET_KEY

    jwt.verify(token, secretKey, (err, decoded) => {
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
}

module.exports = verifyToken