const Joi = require('joi');

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

exports.validate = validateCompany;
exports.validateSearchQuery = validateSearchQuery;