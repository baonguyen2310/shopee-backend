const express = require('express')
const mysql = require('mysql2')

const app = express()

// Tạo kết nối mysql
const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '123',
    database: 'shopee_suabai'
})

db.connect((err) => {
    if (err) {
        console.log(err)
    } else {
        console.log('mysql connected')
    }
})

app.use(express.json())  // phân tích dữ liệu dạng json

app.get('/api/hello', (req, res) => { // tạo ra 1 api endpoint, dạng http GET
    return res.send('Hello From ExpressJs') // trả về response dạng text
})


// CRUD: Create, Read, Update, Delete

// Lấy danh sách sản phẩm có giá nhỏ hơn 2000
app.get('/api/products', (req, res) => {
    const sql = 'SELECT ProductName, Price FROM Products WHERE Price < 2000'
    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            })
        }

        return res.status(200).json(result)
    })
})

app.get('/api/users', (req, res) => {
    const sql = 'SELECT * FROM User'
    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            })
        }

        return res.status(200).json(result)
    })
})

// Thêm 1 sản phẩm mới

app.post('/api/products', (req, res) => {
    const { ProductID, CategoryID, ShopID, ProductName, Price, Stock } = req.body
    if (!ProductID || !CategoryID || !ShopID || !ProductName || !Price || !Stock) {
        return res.status(400).json({
            message: "ProductID, CategoryID, ShopID, ProductName, Price, Stock are required"
        })
    }

    const sql = `INSERT INTO Products (ProductID, CategoryID, ShopID, ProductName, Price, Stock) VALUES (${ProductID}, ${CategoryID}, ${ShopID}, '${ProductName}', ${Price}, ${Stock})`

    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error',
                err: err
            })
        }

        return res.status(200).json({
            message: 'Add product success'
        })
    })
})

// Cập nhật 1 sản phẩm
app.put('/api/products/:id', (req, res) => {
    const ProductID = req.params.id
    const { CategoryID, ShopID, ProductName, Price, Stock } = req.body
    if (!CategoryID || !ShopID || !ProductName || !Price || !Stock) {
        return res.status(400).json({
            message: "CategoryID, ShopID, ProductName, Price, Stock are required"
        })
    }

    const sql = `UPDATE Products SET CategoryID = ${CategoryID}, ShopID = ${ShopID}, ProductName = '${ProductName}', Price = ${Price}, Stock = ${Stock} WHERE ProductID = ${ProductID} AND Stock < 100`

    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error',
                err: err
            })
        }

        return res.status(200).json({
            message: 'Update product success'
        })
    })
})

// Xóa 1 sản phẩm: dùng async await try catch
app.delete('/api/products/:id', (req, res) => {
    const ProductID = req.params.id

    // Kiểm tra ProductID có tồn tại hay không: frontend có truyền vào không
    if (!ProductID) {
        return res.status(400).json({
            message: "ProductID is required"
        })
    }

    // Kiểm tra sản phẩm có tồn tại trong database không
    const checkProduct = `SELECT * FROM Products WHERE ProductID = ${ProductID}` // Nếu có 1 sản phẩm thoả mãn thì vẫn trả về 1 mảng có 1 phần tử
    db.query(checkProduct, (err, result) => {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error',
                err: err
            })
        }

        if (result.length === 0) {
            return res.status(404).json({
                message: 'Product not found'
            })
        }

        const sql = `DELETE FROM Products WHERE ProductID = ${ProductID}`

        db.query(sql, (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: 'Internal Server Error',
                    err: err
                })
            }

            return res.status(200).json({
                message: 'Delete product success'
            })
        })
    })
})

// 

/*
if (sản phẩm không tồn tại) { (err, result) => {
   trả về 404

   xoá sản phẩm
    thành công trả về 200
}
}

*/


/* callback hell
    if (sản phẩm không tồn tại) { (err, result) => {
   trả về 404
        if (danh mục không tồn tại) { (err, result) => {
            trả về 404
            { 
            if (shop không tồn tại) { (err, result) => {
            trả về 404 {
                xoá sản phẩm
                thành công trả về 200
            }
            }
}
}

*/



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