const Joi = require('joi');

function validateUser(user) {
    const schema = {
        username: Joi.string().min(6).max(100).required(),
        password: Joi.string().min(6).max(100).required(),
        email: Joi.string().min(6).max(100).required().email(),
        role_id: Joi.number().required()
    };
    return Joi.validate(user, schema);
}

function validateLogin(req) {
    const schema = {
        password: Joi.string().min(6).max(100).required(),
        email: Joi.string().min(6).max(100).required().email(),
    };
    return Joi.validate(req, schema);
}

exports.validateSignup = validateUser;
exports.validateLogin = validateLogin;