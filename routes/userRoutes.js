const express = require('express')
const userController = require('../controllers/userController')
const middleware2 = require('../middlewares/middleware2')

const router = express.Router()

router.post('/register', userController.register)
router.post('/login', middleware2, userController.login)
router.post('/refresh-token', userController.refreshToken)
router.post('/logout', userController.logout)

module.exports = router