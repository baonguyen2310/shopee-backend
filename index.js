const express = require('express')
const productRoutes = require('./routes/productRoutes')

const app = express()

app.use(express.json())

app.use('/api/v1/products', productRoutes)

app.listen(5001, () => {
    console.log('Server listening at 5001')
})