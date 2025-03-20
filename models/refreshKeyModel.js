const db = require('../config/db')

class RefreshKeyModel {
    static async createRefreshKey(UserID, RefreshPublicKey) {
        const sql = `INSERT INTO RefreshPublicKey (UserID, RefreshPublicKey) VALUES (?, ?)`
        const [rows] = await db.execute(sql, [UserID, RefreshPublicKey])
        return rows
    }

    static async findRefreshKeyByUserId(UserID) {
        const sql = `
            SELECT UserID, RefreshPublicKey
            FROM RefreshPublicKey
            WHERE UserID = ?
            ORDER BY ID DESC
            LIMIT 1
            `
        const [rows] = await db.execute(sql, [UserID])
        return rows[0]
    }

    static async deleteRefreshKeyByUserId(UserID) {
        const sql = `
            DELETE FROM RefreshPublicKey
            WHERE UserID = ?
            `
        const [rows] = await db.execute(sql, [UserID])
        return rows[0]
    }
}

module.exports = RefreshKeyModel