const db = require('../config/db')

class AccessKeyModel {
    static async createAccessKey(UserID, AccessPublicKey) {
        const sql = `INSERT INTO AccessPublicKey (UserID, AccessPublicKey) VALUES (?, ?)`
        const [rows] = await db.execute(sql, [UserID, AccessPublicKey])
        return rows
    }

    static async findAccessKeyByUserId(UserID) {
        const sql = `
            SELECT UserID, AccessPublicKey
            FROM AccessPublicKey
            WHERE UserID = ?
            ORDER BY ID DESC
            LIMIT 1
            `
        const [rows] = await db.execute(sql, [UserID])
        return rows[0]
    }

    static async deleteAccessKeyByUserId(UserID) {
        const sql = `
            DELETE FROM AccessPublicKey
            WHERE UserID = ?
            `
        const [rows] = await db.execute(sql, [UserID])
        return rows[0]
    }
}

module.exports = AccessKeyModel