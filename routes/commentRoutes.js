const express = require('express')
const commentController = require('../controllers/commentController')
const verifyAccessToken = require('../middlewares/verifyAccessToken')
const checkPermission = require('../middlewares/checkPermisson')

const router = express.Router() // bộ định tuyến

router.get('/', verifyAccessToken, commentController.getComments) // cấu hình tuyến đường
router.delete('/:id', verifyAccessToken, checkPermission(['edit_content']), commentController.deleteComment) // cấu hình tuyến đường
router.post('/', verifyAccessToken, commentController.createComment)

module.exports = router