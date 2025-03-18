const db = require('../config/db')

class KeyTokenModel {
    static async createKeyToken(UserID, PublicKey) {
        const sql = `INSERT INTO KeyToken (UserID, PublicKey) VALUES (?, ?)`
        const [rows] = await db.execute(sql, [UserID, PublicKey])
        return rows
    }

    static async findKeyTokenByUserId(UserID) {
        const sql = `
            SELECT UserID, PublicKey
            FROM KeyToken
            WHERE UserID = ?
            ORDER BY KeyID DESC
            LIMIT 1
            `
        const [rows] = await db.execute(sql, [UserID])
        return rows[0]
    }
}

module.exports = KeyTokenModel