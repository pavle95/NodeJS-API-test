const Joi = require('joi');

function validate(tag) {
    const schema = {
        name: Joi.string().min(2).max(100).required(),
    };
    return Joi.validate(tag, schema);
}

exports.validate = validate;