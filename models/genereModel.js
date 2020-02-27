const mongoose = require('mongoose');
const Joi = require('joi');

const genereSchema = new mongoose.Schema({
    name: String
});

const genereModel = new mongoose.model('genere', genereSchema);


const validation = (input, schema) => {
    const validationResult =  Joi.validate(input, schema);
    return validationResult.error ? false : true;
}

module.exports = {genereModel, validation};