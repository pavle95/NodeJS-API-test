const jwt = require('jsonwebtoken');
const {Role, Advert, Company} = require('../database/models/index');

function roleAuth(key) {
    return async (req, res, next) => {
        try {
            console.log('uiip');
            const token = req.header('x-auth-token');
            if (!token) res.status(403).send({success:false, message:'Access denied, token not provided.'});

            const decoded = jwt.verify(token, 'jwtPK');
            const role = await Role.findOne({ where: { id: decoded.role_id } });
            if (!role) return res.status(403).json({success:fail});

            if (role.name != key) return res.status(403).json({success:false, message:'Access denied.'});
            req.user = decoded;
            //temp

            //
            next();
        } catch (e) {
            return res.status(500).json({success:false, message:e.message});
        }

    }
}

function ownerCheck() {
    return async (req , res, next) => {
        try {
            console.log(req.user.id);
            //
            const company = await Company.findOne({ where: { user_id: req.user.id}});
            //
            const advert = await Advert.findOne({ where: { id: req.params.id, company_id: company.id}})
            if(!advert) return res.status(404).json({success:false, message:'Advert details not found.'})

            req.advert = advert;
            next();
        } catch(e) {
            return res.status(500).json({success:false, message:e.message});
        }
    }
}

exports.roleAuth = roleAuth;
exports.ownerCheck = ownerCheck;