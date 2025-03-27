const UserModel = require('../models/userModel')

const checkPermission = (requiredPermissions) => {
    return (
        async (req, res, next) => {
            try {
                if (!req.user) {
                    return res.status(401).json({ error: 'Authentication Required' })
                }
        
                const userRoles = await UserModel.getUserRoles(req.user.userId)
                const userPermissions = userRoles.map(role => role.PermissionName)
        
                const hasPermission = requiredPermissions.some(permission => 
                    userPermissions.includes(permission)
                )
        
                if (!hasPermission) {
                    return res.status(403).json({ error: 'Permission Denied' })
                }
        
                next()
        
            } catch (error) {
                return res.status(500).json({
                    status: 'error',
                    message: 'check permisson failed',
                    data: error
                })
            }
        }
    )
}


module.exports = checkPermission
