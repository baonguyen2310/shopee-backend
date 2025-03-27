const db = require("../config/db");

class RoleModel {
    static async getAllRoles() {
        const sql = "SELECT * FROM Role"
        const [rows] = await db.query(sql)
        return rows
    }

    static async createRole(roleName) {
        const sql = "INSERT INTO Role (RoleName) VALUES (?, ?)"
        const [rows] = await db.query(sql, [roleName])
        return rows
    }

    static async assignRoleToUser(userId, roleId) {
        const sql = "INSERT INTO UserRole (UserID, RoleID) VALUES (?, ?)"
        const [rows] = await db.query(sql, [userId, roleId]);
        return rows
    }

    static async getRolePermissions(roleId) {
        const sql = `
                SELECT p.PermissionName 
                FROM RolePermission rp
                JOIN Permission p ON rp.PermissionID = p.PermissionID
                WHERE rp.RoleID = ?
            `

        const [rows] = await db.query(sql, [roleId]);
        return rows;
    }
}

module.exports = RoleModel;
