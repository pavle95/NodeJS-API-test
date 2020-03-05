const Sequelize = require('sequelize');
const db = require('../database/database');
const Joi = require('joi');

const Company = db.define('company', {
    id: {
        field: 'id', 
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        field: 'user_id',
        type: Sequelize.INTEGER,
        foreignKey: true
    },
    name: {
        field: 'name',
        type: Sequelize.STRING,
        unique: true
    },
    no_employees: {
        field: 'no_employees',
        type: Sequelize.INTEGER
    },
    category: {
        field: 'category',
        type: Sequelize.STRING,
        unique: true
    },
    working_time: {
        field: 'working_time',
        type: Sequelize.STRING
    },
    website: {
        field: 'website',
        type: Sequelize.STRING
    }
},{
    timestamps: false,
    freezeTableName: true
});

function validateCompany(company) {
    const schema = {
        name: Joi.string().min(3).max(100).required(),
        no_employees: Joi.number().required(),
        category: Joi.string().min(2).max(100).required(),
        working_time: Joi.string().min(3).max(50).required(),
        website: Joi.string().min(5).max(30).required()
    };
    return Joi.validate(company, schema);
}

function validateSearchQuery(company) {
    const schema = {
        name: Joi.string().min(2).max(100),
        category: Joi.string().min(3).max(50)
    }
    return Joi.validate(company, schema);
}

exports.Company = Company;
exports.validate = validateCompany;
exports.validateSearchQuery = validateSearchQuery;