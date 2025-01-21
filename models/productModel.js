const db = require('../config/db')

class Product {
    static async getAllProducts() {
        const sql = 'SELECT ProductName, Price FROM Products'
        const [rows] = await db.execute(sql)
        return rows
    }

    static async createProduct({ ProductID, CategoryID, ShopID, ProductName, Price, Stock }) {
        const sql = `
            INSERT INTO Products (ProductID, CategoryID, ShopID, ProductName, Price, Stock)
            VALUES (?, ?, ?, ?, ?, ?)
            `
        
        const [rows] = await db.execute(sql, [ProductID, CategoryID, ShopID, ProductName, Price, Stock])
        return rows
    }

    static async updateProduct({ ProductID, CategoryID, ShopID, ProductName, Price, Stock }) {
        const sql = `
            UPDATE Products
            SET CategoryID = ?, ShopID = ?, ProductName = ?, Price = ?, Stock = ? WHERE ProductID = ?`
        
        const [rows] = await db.execute(sql, [ProductID, CategoryID, ShopID, ProductName, Price, Stock])
        return rows
    }

    static async deleteProduct(ProductID) {
        const sql = `DELETE FROM Products WHERE ProductID = ?`
        const [rows] = await db.execute(sql, [ProductID])
        return rows
    }
}

module.exports = Product