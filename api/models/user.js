const Sequelize = require('sequelize');
const db = require('../database/database');
const Joi = require('joi');

const User = db.define('user', {
    id: {
        field: 'id', 
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        field: 'username',
        type: Sequelize.STRING,
        unique: true
    },
    password: {
        field: 'password',
        type: Sequelize.STRING
    },
    email: {
        field: 'email',
        type: Sequelize.STRING,
        unique: true
    },
    role_id: {
        field: 'role_id',
        type: Sequelize.STRING
    }

},{
    timestamps: false,
    freezeTableName: true
});


function validateUser(user) {
    const schema = {
        username: Joi.string().min(6).max(100).required(),
        password: Joi.string().min(6).max(100).required(),
        email: Joi.string().min(6).max(100).required().email(),
        role_id: Joi.number().required()
    };
    return Joi.validate(user, schema);
}

function validateUserLogin(req) {
    const schema = {
        password: Joi.string().min(6).max(100).required(),
        email: Joi.string().min(6).max(100).required().email(),
    };
    return Joi.validate(req, schema);
}

exports.User = User;
exports.validateSignup = validateUser;
exports.validateLogin = validateUserLogin;