const Sequelize = require('sequelize');
const Joi = require('joi');

module.exports = (sequelize) => {
    const User = sequelize.define('user', {
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

    }, {
        timestamps: false,
        freezeTableName: true
    });
    User.associate = function(models) {
        User.belongsTo(models.Role, {
            foreignKey: 'role_id',
            as: 'user'
        });
        User.hasOne(models.Company, {
            foreignKey: 'user_id',
            as: 'company'
        });
        User.hasOne(models.Applicant, {
            foreignKey: 'user_id',
            as: 'applicant'
        });
    };
    return User;
}


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

exports.validateSignup = validateUser;
exports.validateLogin = validateUserLogin;