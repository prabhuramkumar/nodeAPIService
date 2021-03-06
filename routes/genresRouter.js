const express = require('express');
const admin = require('../middleware/adminMiddleware');
const auth = require('../middleware/auth');
const router = express.Router();
const Joi = require('joi');
const {genereModel, validateName, validateID} = require('../models/genereModel');

router.get('/', async function (req, res) {
    const movieGeneresList = await genereModel.find();
    res.send(movieGeneresList);
});

router.post('/', [auth, admin], async function (req, res) {
    const error = validateName(req.body);
    if(error) return res.status(400).send("validation error");

    const newGenere = new genereModel({
        name: req.body.name
    });
    await newGenere.save();
    res.send(newGenere);
});

router.put('/:id',[auth, admin], async function (req, res) {
    const error = validateName(req.body)
    if(error) return res.status(400).send("Validation Error");
        
    const genere =  await genereModel.findByIdAndUpdate({_id: req.params.id}, {$set: {name: req.body.name}});
    res.send(genere);
});

router.delete('/:id',[auth, admin], async function (req, res) {
    const error = validateID(req.params.id)
    if(error) return res.status(400).send("Validation Error");

    const genere =  await genereModel.findByIdAndDelete({_id: req.params.id});
    res.send(genere);
});

module.exports = router;