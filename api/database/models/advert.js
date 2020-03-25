const Sequelize = require('sequelize');
const Joi = require('joi');

module.exports = (sequelize) => {
    const Advert = sequelize.define('advert', {
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
    Advert.associate = function(models) {
        console.log(models);
        Advert.belongsToMany(models.Tag, {
            through: models.AdvertTag, 
            foreignKey: 'advert_id', 
            as: 'tags'
        });
        Advert.belongsToMany(models.Applicant, {
            through: models.ApplicantAdvert, 
            foreignKey: 'advert_id', 
            as: 'adverts'
        });
    };
    return Advert
}


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

exports.validate = validate;

