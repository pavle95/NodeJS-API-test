const Sequelize = require('sequelize');
const Joi = require('joi');

module.exports = (sequelize) => {
    const Applicant = sequelize.define('applicant', {
        id: {
            field: 'id', 
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            field: 'user_id',
            type: Sequelize.INTEGER
        },
        first_name: {
            field: 'first_name',
            type: Sequelize.STRING,
            unique: true
        },
        last_name: {
            field: 'last_name',
            type: Sequelize.STRING,
            unique: true
        },
        bio: {
            field: 'bio',
            type: Sequelize.INTEGER
        },
        category: {
            field: 'category',
            type: Sequelize.STRING,
            unique: true
        },
        portfolio: {
            field: 'portfolio',
            type: Sequelize.STRING
        }
    },{
        timestamps: false,
        freezeTableName: true
    });
    Applicant.associate = function(models) {
        Applicant.belongsTo(models.User, {
            foreignKey: 'user_id', 
            as: 'user'
        });
        Applicant.belongsToMany(models.Advert, {
            through: models.ApplicantAdvert, 
            foreignKey: 'applicant_id', 
            as: 'applicants'
        });
    };
    return Applicant;
}


function validateApplicant(applicant) {
    const schema = {
        first_name: Joi.string().min(2).max(100).required(),
        last_name: Joi.string().min(2).max(100).required(),
        bio: Joi.string().min(5).max(500).required(),
        category: Joi.string().min(3).max(50).required(),
        portfolio: Joi.string().min(5).max(30).required()
    };
    return Joi.validate(applicant, schema);
}

function validateSearchQuery(applicant) {
    const schema = {
        first_name: Joi.string().min(2).max(100),
        last_name: Joi.string().min(2).max(100),
        category: Joi.string().min(3).max(50)
    }
    return Joi.validate(applicant, schema);
}


exports.validateApplicant = validateApplicant;
exports.validateSearchQuery = validateSearchQuery