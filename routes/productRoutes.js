const express = require('express')
const productController = require('../controllers/productController')
const verifyAccessToken = require('../middlewares/verifyAccessToken')

const router = express.Router() // bộ định tuyến

router.get('/', verifyAccessToken, productController.getAllProducts) // cấu hình tuyến đường
router.delete('/:id', verifyAccessToken, productController.deleteProduct) // cấu hình tuyến đường

module.exports = router