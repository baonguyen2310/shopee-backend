const bcrypt = require('bcrypt')
const db = require('../config/db')

class User {
    static async createUser(UserID, UserName, Password) {
        const saltRounds = 10
        const hashPassword = await bcrypt.hash(Password, saltRounds)

        const sql = `INSERT INTO User (UserID, UserName, Password)
            VALUES (?, ?, ?)
        `

        const [rows] = await db.execute(sql, [UserID, UserName, hashPassword])
        return rows
    }

    static async findUserById(UserID) {
        const sql = `
            SELECT UserID, UserName, Password
            FROM User
            WHERE UserID = ?
        `
        const [rows] = await db.execute(sql, [UserID])
        return rows[0]
    }
}

module.exports = User