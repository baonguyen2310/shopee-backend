const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const UserModel = require('../models/userModel')

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

        const data = {
            userId: foundUser.UserID,
            userName: foundUser.UserName
        }

        // đăng nhập thành công, tạo jwt v1: mã hoá đối xứng
        const secretKey = '123456789'
        const token = jwt.sign(data, secretKey, { expiresIn: '1h' })

        // access token (expire ngắn), refresh token (expire dài)
        // AT hết hạn => RT xin server cấp AT mới => không đăng nhập lại dù AT có thời gian sống ngắn
        // => Vậy thì bị đánh cắp RT thì sao? => Dễ dàng xin lại AT
        // Phải có cơ chế thu hồi RT khi phát hiện bất thường
        // => Làm sao phân biệt được user hay hacker đang dùng RT để xin AT
        // IP (không thuật tiện), Thiết bị (Chrome, Mobile, làm giả được) => Không ổn, chỉ dùng bổ sung
        // => Không cần phân biệt user và hacker
        // => Cần phát hiện bất thường: Ví dụ, hacker dùng RT cũ
        // => Khi nghi ngờ bất thường => Huỷ hết AT, RT => Bắt tất cả đăng nhập lại (kể cả user và hacker)


        return res.status(200).json({
            status: 'success',
            message: 'Login successfully',
            data: token
        })


    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Login failed',
            data: error
        })
    }
}