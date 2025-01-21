const express = require('express')
const productController = require('../controllers/productController')

const router = express.Router() // bộ định tuyến

router.get('/', productController.getAllProducts) // cấu hình tuyến đường
router.delete('/:id', productController.deleteProduct) // cấu hình tuyến đường

module.exports = router