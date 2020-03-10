const mongoose = require('mongoose');
const Joi = require('joi');

const genereSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    }
});

const genereModel = new mongoose.model('generes', genereSchema);

const schemaGenereName = {
    name: Joi.string().min(3).required()
}
const schemaGenereID = Joi.string().min(7).required();

const validateName = (input) => {
    const validationResult =  Joi.validate(input, schemaGenereName);
    return validationResult.error;
}

const validateID = (input) => {
    const validationResult =  Joi.validate(input, schemaGenereID);
    return validationResult.error;
}

module.exports = {genereModel, genereSchema, validateName, validateID};