const Sequelize = require('sequelize');
const db = require('../database/database');
const Joi = require('joi');

const Advert = db.define('advert', {
    id: {
        field: 'id', 
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    company_id: {
        field: 'company_id',
        type: Sequelize.INTEGER
    },
    title: {
        field: 'title',
        type: Sequelize.STRING,
    },
    description: {
        field: 'description',
        type: Sequelize.TEXT,
    },
    from: {
        field: 'from',
        type: Sequelize.DATEONLY,
    },
    to: {
        field: 'to',
        type: Sequelize.DATEONLY
    }
},{
    timestamps: false,
    freezeTableName: true
});

function validate(advert) {
    const schema = {
        title: Joi.string().min(2).max(100).required(),
        description: Joi.string().min(2).max(100).required(),
        from: Joi.date().required(),
        to: Joi.date().greater(Joi.ref('from')).required(),
        tags: Joi.array().required()
    };
    return Joi.validate(advert, schema);
}

exports.Advert = Advert;
exports.validate = validate;

