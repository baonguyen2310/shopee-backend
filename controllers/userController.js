const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const fs = require('fs')
const UserModel = require('../models/userModel')
const AccessKeyModel = require('../models/accessKeyModel')
const RefreshKeyModel = require('../models/refreshKeyModel')
const { createKeyPairs } = require('../utils/createKeyPairs')

exports.register = async (req, res) => {
    try {
        const { UserID, UserName, Password } = req.body
        await UserModel.createUser(UserID, UserName, Password)
        return res.status(201).json({
            status: 'success',
            message: 'User created successfully',
            data: null
        })
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'User create failed',
            data: error
        })
    }
}

exports.login = async (req, res) => {
    try {
        const { UserID, Password } = req.body
        const foundUser = await UserModel.findUserById(UserID)

        // if (!foundUser) {
        //     return res.status(400).json({
        //         status: 'error',
        //         message: 'UserID not found',
        //         data: null
        //     })
        // }

        // if (!(await bcrypt.compare(Password, foundUser.Password))) {
        //     return res.status(400).json({
        //         status: 'error',
        //         message: 'Wrong Password',
        //         data: null
        //     })
        // }

        if (!foundUser || !(await bcrypt.compare(Password, foundUser.Password))) {
            return res.status(400).json({
                status: 'error',
                message: 'Invalid credentials',
                data: null
            })
        }

        const userId = foundUser.UserID

        const data = {
            userId: foundUser.UserID,
            userName: foundUser.UserName
        }

        // đăng nhập thành công, tạo jwt v2: mã hoá bất đối xứng
        const { privateKey: accessPrivateKey, publicKey: accessPublicKey } = createKeyPairs()
        const { privateKey: refreshPrivateKey, publicKey: refreshPublicKey } = createKeyPairs()


        await AccessKeyModel.createAccessKey(userId, accessPublicKey)
        await RefreshKeyModel.createRefreshKey(userId, refreshPublicKey)

        const accessToken = jwt.sign(data, accessPrivateKey, {
            algorithm: 'RS256',
            expiresIn: '30m'
        })

        const refreshToken = jwt.sign(data, refreshPrivateKey, {
            algorithm: 'RS256',
            expiresIn: '7d'
        })

        // access token (expire ngắn), refresh token (expire dài)
        // AT hết hạn => RT xin server cấp AT mới (/refresh-token) => không đăng nhập lại dù AT có thời gian sống ngắn
        // => Vậy thì bị đánh cắp RT thì sao? => Dễ dàng xin lại AT
        // Phải có cơ chế thu hồi RT khi phát hiện bất thường
        // => Làm sao phân biệt được user hay hacker đang dùng RT để xin AT
        // IP (không thuật tiện), Thiết bị (Chrome, Mobile, làm giả được) => Không ổn, chỉ dùng bổ sung
        // => Không cần phân biệt user và hacker
        // => Cần phát hiện bất thường: Ví dụ, hacker dùng RT cũ
        // => Khi nghi ngờ bất thường => Huỷ hết AT, RT => Bắt tất cả đăng nhập lại (kể cả user và hacker)


        // Thiết kế phía client:
        // Truy cập vào products => server trả về là AT hết hạn
        // => client fetch api /refresh-token để xin lại AT
        // => Server trả về AT mới
        // => client fetch products bằng AT mới

        return res.status(200).json({
            status: 'success',
            message: 'Login successfully',
            data: {
                accessToken: accessToken,
                refreshToken: refreshToken
            }
        })


    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Login failed',
            data: error
        })
    }
}


exports.refreshToken = async (req, res) => {
    // 1. Nhận refreshToken
    // 2. Verify refreshToken
    // 3. Tạo AT và RT: (lưu PublicKey)
    // 4. Trả về AT và RT

    try {
        const authHeader = req.headers.authorization

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                status: 'error',
                message: 'Unauthorized',
                data: null
            })
        }

        const userRefreshToken = authHeader.split(" ")[1]

        const userId = req.body.userId

        if (!userId) {
            return res.status(401).json({
                status: 'error',
                message: 'Unauthorized',
                data: null
            })
        }

        const foundRefreshKey = await RefreshKeyModel.findRefreshKeyByUserId(userId)

        if (!foundRefreshKey) {
            return res.status(401).json({
                status: 'error',
                message: 'Unauthorized',
                data: null
            })
        }

        const publicKey = foundRefreshKey.RefreshPublicKey

        const decoded = jwt.verify(userRefreshToken, publicKey)
        
        const payload = {
            userId: decoded.userId,
            userName: decoded.userName
        }

        const { privateKey: accessPrivateKey, publicKey: accessPublicKey } = createKeyPairs()
        const { privateKey: refreshPrivateKey, publicKey: refreshPublicKey } = createKeyPairs()

        await AccessKeyModel.createAccessKey(userId, accessPublicKey)
        await RefreshKeyModel.createRefreshKey(userId, refreshPublicKey)

        const accessToken = jwt.sign(payload, accessPrivateKey, {
            algorithm: 'RS256',
            expiresIn: '1m'
        })

        const refreshToken = jwt.sign(payload, refreshPrivateKey, {
            algorithm: 'RS256',
            expiresIn: '7d'
        })

        return res.status(200).json({
            status: 'success',
            message: 'Refresh Token Successfully',
            data: {
                accessToken: accessToken,
                refreshToken: refreshToken
            }
        })

    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Refresh Token Failed',
            data: error
        })
    }
}

exports.logout = async (req, res) => {
    // 1. Thu hồi AT và RT
    // Cách 1: Xoá hết publicKey của user trong db: xử lý gián tiếp (phụ thuộc)
    // Cách 2: Thêm 1 trường is_revoked (đã bị huỷ) trong bảng publicKey: xử lý gián tiếp (phụ thuộc)
    // Cách 3: Tạo 1 bảng các tokens đã bị huỷ (blacklist - danh sách đen)
    // Cách 4: Dùng danh sách trắng (Bỏ AT và RT khỏi danh sách trắng)

    // Nhược điểm cách 3,4: so sánh chuỗi token => tốn tài nguyên
    // => Cơ sở dữ liệu trên RAM: Redis

    // Danh sách đen: những item trong danh sách bị cấm
    // Danh sách trắng: những item trong danh sách được phép

    try {
        // Triển khai thêm: Nhận AT lên để xác thực đúng người dùng đó logout

        const userId = req.body.UserID

        await AccessKeyModel.deleteAccessKeyByUserId(userId)
        await RefreshKeyModel.deleteRefreshKeyByUserId(userId)

        return res.status(200).json({
            status: 'success',
            message: 'Logout Successfully',
            data: null
        })

    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Logout Failed',
            data: error
        })
    }
}