const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 100
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 100,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 100
    },
    isAdmin: Boolean
});

const userModel = new mongoose.model('User', userSchema);

const userSchemaJoi = {
    name: Joi.string().min(3).required(),
    email: Joi.string().required().email(),
    password: Joi.string().min(4).required(),
    isAdmin: Joi.boolean()
}

const validateUser = (input) => {
    const validationResult =  Joi.validate(input, userSchemaJoi);
    return validationResult.error;
}


module.exports = {userModel, validateUser};