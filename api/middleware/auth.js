const jwt = require('jsonwebtoken');
const {Role} = require('../database/models/index');

function roleAuth(key) {
    return async (req, res, next) => {
        try {
            const token = req.header('x-auth-token');
            if (!token) res.status(403).send({success:false, message:'Access denied, token not provided.'});

            const decoded = jwt.verify(token, 'jwtPK');
            const role = await Role.findOne({ where: { id: decoded.role_id } });
            if (!role) return res.status(403).json({success:fail});

            if (role.name != key) return res.status(403).send({success:false, message:'Access denied.'});
            req.user = decoded;

            next();
        } catch (e) {
            return res.status(500).json({success:false, message:e.message});
        }

    }
}

exports.roleAuth = roleAuth;