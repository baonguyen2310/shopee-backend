const express = require('express')
const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')

const app = express()

app.use(express.json())

app.use('/api/v1/products', productRoutes)
app.use('/api/v1/users', userRoutes)

app.listen(5001, () => {
    console.log('Server listening at 5001')
})


// model => controller => router => index

// 1. AUTO INCREMENT: Khai báo cột id trong sql
// 2. UUID: Sử dụng thư viện để tạo id duy nhất