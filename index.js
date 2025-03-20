const express = require('express')
const cors = require('cors')
const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')

const app = express()

app.use(cors()) // cho phép truy cập khác nguồn gốc
app.use(express.json()) // xử lý req.body dạng json

app.use('/api/v1/products', productRoutes)

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


// kết nối redis
const redis = require("redis");
require("dotenv").config();

(async () => {
    // const client = createClient({
    //     username: 'default',
    //     password: '*******',
    //     socket: {
    //         host: 'redis-11719.c325.us-east-1-4.ec2.redns.redis-cloud.com',
    //         port: 11719
    //     }
    // });

    const client = redis.createClient()

    client.on("error", (err) => console.log("Redis Client Error", err));

    await client.connect();
    console.log("Redis Connected!")

    await client.set("token", "123456789");
    const value = await client.get("token");
    console.log(value);
})();