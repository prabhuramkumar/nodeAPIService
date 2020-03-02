const express = require('express');
const router = express.Router();
const Joi = require('joi');
const {genereModel, validateName, validateID} = require('../models/genereModel');

router.get('/', async function (req, res) {
    const movieGeneresList = await genereModel.find();
    res.send(movieGeneresList);
});

router.post('/', async function (req, res) {
    if(!validateName(req.body)) {
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
    if(!validateName(req.body)) {
        const genere =  await genereModel.findByIdAndUpdate({_id: req.params.id}, {$set: {name: req.body.name}});
        res.send(genere);
    }else{
        res.status(400).send("Validation Error");
    }
});

router.delete('/:id', async function (req, res) {
    if(validateID(req.params.id)) {
        const genere =  await genereModel.findByIdAndDelete({_id: req.params.id});
        res.send(genere);
    }else{
        res.status(400).send("Validation Error");
    }
});

module.exports = router;