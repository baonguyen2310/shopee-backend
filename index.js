const express = require('express')

const app = express()

app.use(express.json())  // phân tích dữ liệu dạng json

const products = [
    {
        product_id: "1",
        product_name: "Quan",
        product_price: 100000
    },
    {
        product_id: "2",
        product_name: "Ao",
        product_price: 200000
    }
]


app.get('/api/hello', (req, res) => { // tạo ra 1 api endpoint, dạng http GET
    return res.send('Hello From ExpressJs') // trả về response dạng text
})

app.get('/api/products', (req, res) => {
    return res.status(200).json(products)
})

app.post('/api/cart', (req, res) => {
    const userId = req.body.userId
    
    if (!userId) {
        return res.json({
            message: "add to cart failed, userId is required"
        })
    }

    return res.json({
        message: "add to cart success",
        userId: userId
    })
})

app.listen(5001, () => {
    console.log('server listening at port 5001')
})