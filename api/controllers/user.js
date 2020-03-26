const {validateSignup, validateLogin} = require('../validation/user');
const {User, Company, Applicant, Role} = require('../database/models/index');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
//const jwtKey = process.env.jwtKey;

exports.signup = async (req, res) => {
    try {
        const {error} = validateSignup(req.body);
        if (error) return res.status(400).json({success:false,message:error.details[0].message});
    
        let user = await User.findOne({where: {email: req.body.email}});
        if (user) return res.status(400).json({success:false,message:'Email in use.'});
        
        let password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync());

        let role = await Role.findOne({where: {id: req.body.role_id}});
        if(!role) return res.status(400).json({success:false,message:`Role doesn't exist.`});
    
        user = new User({
            username: req.body.username,
            email: req.body.email,
            password: password,
            role_id: req.body.role_id
        });
    
        await user.save();

        if (role.name == 'company') {
            company = new Company({
                user_id: user.id,
            });
            await company.save();

        } else if ( role.name == 'applicant') {
            applicant = new Applicant({
                user_id: user.id
            });
            await applicant.save();
        }
    
        const token = jwt.sign({
            id: user.id,
            username: user.username,
            role_id: user.role_id
        },'jwtPK');

        res.status(200).header('x-auth-token', token).json({success:true,message:"Registration successful.",data:{user}});
    } catch (e) {
        res.status(500).json(e.message);
    }
    
}

exports.login = async (req, res) => {
    try {
        console.log(validateLogin);
        const {error} = validateLogin(req.body);
        if(error) return res.status(400).json({success:false,message:error.details[0].message});
    
        let user = await User.findOne({where: {email: req.body.email}});
        if(!user) return res.status(400).json({success:false,message:'Ivalid email or password.'});
        
        const passwordMatch = await bcrypt.compare(req.body.password, user.password);
        if(!passwordMatch) {
            return res.status(400).json({success:false,message:'Ivalid email or password.'});
        }
    
        const token = jwt.sign({
            id: user.id,
            username: user.username,
            role_id: user.role_id
        },'jwtPK');
    
        res.status(200).json({success:true,message:"Login successful",data:{token}});
    } catch(e) {
        res.status(500).json({success:false,message:e.message});
    }
    
}