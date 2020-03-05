const Sequelize = require('sequelize');
const db = require('../database/database');
const Joi = require('joi');

const Tag = db.define('tag', {
    id: {
        field: 'id', 
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        field: 'name',
        type: Sequelize.STRING,
        unique: true
    }
},{
    timestamps: false,
    freezeTableName: true
});

function validate(tag) {
    const schema = {
        name: Joi.string().min(2).max(100).required(),
    };
    return Joi.validate(tag, schema);
}

exports.Tag = Tag;
exports.validate = validate;