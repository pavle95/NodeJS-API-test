const jwt = require('jsonwebtoken');
const {Role, Advert, Company, Applicant, Chat} = require('../database/models/index');

function auth() {
    return async (req, res, next) => {
        try {
            const token = req.header('x-auth-token');
            if (!token) res.status(403).send({ success: false, message: 'Access denied, token not provided.' });

            const user = jwt.verify(token, 'jwtPK');
            req.user = user;
            next();
        } catch (e) {
            return res.status(500).json({ success: false, message: e.message });
        }
    }
}

function roleAuth(key) {
    return async (req, res, next) => {
        try {
            const role = await Role.findOne({ where: { id: req.user.role_id } });
            if (!role) return res.status(403).json({success:fail});

            if (role.name != key) return res.status(403).json({success:false, message:'Access denied.'});
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
            //console.log(req.user.id);
            //
            const company = await Company.findOne({ where: { user_id: req.user.id}});
            //
            const advert = await Advert.findOne({ where: { id: req.params.id, company_id: company.id}})
            if(!advert) return res.status(404).json({success:false, message:'Advert details not found.'})

            req.advert = advert;
            req.company = company;
            next();
        } catch(e) {
            return res.status(500).json({success:false, message:e.message});
        }
    }
}

function chatCheck() {
    return async (req, res, next) => {
        try {
            const role = await Role.findOne({ where: { id: req.user.role_id } });
            let owner_id;
            console.log(role.name);
            if (role.name == 'company') {
                const company = await Company.findOne({ where: { user_id: req.user.id}});
                console.log(company.id);
                owner_id = company.id;
            } else if(role.name == 'applicant') {
                console.log('zasto');
                const applicant = await Applicant.findOne({ where: { user_id: req.user.id}});
                owner_id = applicant.id;
            }
            const field = role.name+'_id';
            const chat = await Chat.findOne({ where: { [field]: owner_id}});
            if (!chat) return res.status(401).json('Not authorized.');
            req.chat = chat;
            next();
        } catch(e) {
            return res.status(500).json({success:false, message:e.message});
        }
    }
}

exports.auth = auth;
exports.roleAuth = roleAuth;
exports.ownerCheck = ownerCheck;
exports.chatCheck = chatCheck;