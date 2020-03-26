const Joi = require('joi');

function validateAdvert(advert) {
    const schema = {
        title: Joi.string().min(2).max(100).required(),
        description: Joi.string().min(2).max(100).required(),
        from: Joi.date().required(),
        to: Joi.date().greater(Joi.ref('from')).required(),
        tags: Joi.array().required()
    };
    return Joi.validate(advert, schema);
}

exports.validateAdvert = validateAdvert;