const Joi = require('joi');
const validation = (input, schema) => {
    const validationResult =  Joi.validate(input, schema);
    return validationResult.error ? false : true;
}

module.exports = validation;
