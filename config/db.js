// npm i dotenv
const mysql = require('mysql2/promise')
const dotenv = require('dotenv')
dotenv.config()

// Tạo kết nối mysql
// const db = mysql.createPool({
//     host: 'localhost',
//     port: 3306,
//     user: 'root',
//     password: '123',
//     database: 'shopee_suabai',
//     connectionLimit: 100, // số lượng connect đồng thời tối đa
//     queueLimit: 0, // không giới hạn hàng chờ
//     waitForConnections: true // cho phép chờ
// })

const db = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    connectionLimit: 100, // số lượng connect đồng thời tối đa
    queueLimit: 0, // không giới hạn hàng chờ
    waitForConnections: true // cho phép chờ
})

module.exports = db


// ES5:
// package.json: "type": "commonjs"
// import: require
// export: module.exports


// ES6:
// package.json: "type": "module"
// import: import ... from ...
// export: export {}, export default