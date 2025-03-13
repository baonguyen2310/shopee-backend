const express = require('express')
const userController = require('../controllers/userController')
const middleware2 = require('../middlewares/middleware2')

const router = express.Router()

router.post('/register', userController.register)
router.post('/login', middleware2, userController.login)
router.post('/login-v2', userController.login_v2)

module.exports = router