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

        // Gán role mặc định là viewer
        const sqlAssignRole = 'INSERT INTO UserRole (UserID, RoleID) VALUES (?, ?)'
        await db.query(sqlAssignRole, [UserID, '3'])

        return rows

        // TRANSACTION
        // await db.beginTransaction()

        // try {
        //     const sql = `INSERT INTO User (UserID, UserName, Password)
        //         VALUES (?, ?, ?)
        //     `

        //     const [rows] = await db.execute(sql, [UserID, UserName, hashPassword])

        //     // Gán role mặc định là viewer
        //     const sqlAssignRole = 'INSERT INTO UserRole (UserID, RoleID) VALUES (?, ?)'
        //     await db.query(sqlAssignRole, [UserID, '3'])

        //     return rows
        // } catch (err) {
        //     await db.rollback()
        //     throw err
        // } finally {
        //     await db.end()
        // }

    }

    static async getUserRoles(UserID) {
        const sql = `
            SELECT r.RoleName, p.PermissionName 
            FROM UserRole ur
            JOIN Role r ON ur.RoleID = r.RoleID
            JOIN RolePermission rp ON r.RoleID = rp.RoleID
            JOIN Permission p ON rp.PermissionID = p.PermissionID
            WHERE ur.UserID = ?
        `
        const [rows] = await db.query(sql, [UserID]);
    
        return rows;
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

    static async getAllUsers() {
        const sql = `
            SELECT UserID, UserName
            FROM User
        `
        const [rows] = await db.query(sql)
        return rows
    }
}

module.exports = User