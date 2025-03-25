const express = require('express')
const cors = require('cors')
const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')
const connectMongoDB = require('./config/mongodb')
const commentRoutes = require('./routes/commentRoutes')

connectMongoDB()

const app = express()

app.use(cors()) // cho phép truy cập khác nguồn gốc
app.use(express.json()) // xử lý req.body dạng json

app.use('/api/v1/products', productRoutes)
app.use('/api/v1/comments', commentRoutes)

app.use((req, res, next) => {
    console.log(`Middleware 1`)
    // req.body.UserID = '123'
    // console.log(`Middleware 1: ${req.body.UserID}`)
    next()
})

app.use('/api/v1/users', userRoutes)

app.listen(5001, () => {
    console.log('Server listening at 5001')
})


// model => controller => router => index

// 1. AUTO INCREMENT: Khai báo cột id trong sql
// 2. UUID: Sử dụng thư viện để tạo id duy nhất