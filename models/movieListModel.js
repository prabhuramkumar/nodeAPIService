const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 100,
        unique: true
    },
    genereID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'generes',
        required: true
    },
    year: {
        type: Number,
        minlength: 4,
        maxlength: 4
    },
    review: {
        type: String,
        minlength: 0,
        maxlength: 200
    }
});

const movieModel = new mongoose.model('movieList', movieSchema);

const movieSchemaJoi = {
    title: Joi.string().min(3).required(),
    genereID: Joi.string().required(),
    year: Joi.number().min(4).required(),
    review: Joi.string().min(1).required()
}

const validateMovie = (input) => {
    const validationResult =  Joi.validate(input, movieSchemaJoi);
    return validationResult.error;
}


module.exports = {movieModel, validateMovie};