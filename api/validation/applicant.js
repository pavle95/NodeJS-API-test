const Joi = require('joi');

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