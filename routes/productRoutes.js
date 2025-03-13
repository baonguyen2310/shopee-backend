const express = require('express')
const productController = require('../controllers/productController')
const verifyToken = require('../middlewares/verifyToken')

const router = express.Router() // bộ định tuyến

router.get('/', verifyToken, productController.getAllProducts) // cấu hình tuyến đường
router.delete('/:id', verifyToken, productController.deleteProduct) // cấu hình tuyến đường

module.exports = router