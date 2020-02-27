const express = require('express');
const router = express.Router();
const Joi = require('joi');
const {genereModel, validation} = require('../models/genereModel');

const schemaGenereName = {
    name: Joi.string().min(3).required()
}
const schemaGenereID = Joi.string().min(7).required();

router.get('/', async function (req, res) {
    const movieGeneresList = await genereModel.find();
    res.send(movieGeneresList);
});

router.post('/', async function (req, res) {
    if(validation(req.body, schemaGenereName)) {
        const newGenere = new genereModel({
            name: req.body.name
        });
        await newGenere.save();
        res.send(newGenere);
    }else{
        res.status(400).send("validation error");
    }
});

router.put('/:id', async function (req, res) {
    if(validation(req.body, schemaGenereName)) {
        const genere =  await genereModel.findByIdAndUpdate({_id: req.params.id}, {$set: {name: req.body.name}});
        res.send(genere);
    }else{
        res.status(400).send("Validation Error");
    }
});

router.delete('/:id', async function (req, res) {
    if(validation(req.params.id, schemaGenereID)) {
        const genere =  await genereModel.findByIdAndDelete({_id: req.params.id});
        res.send(genere);
    }
});

module.exports = router;