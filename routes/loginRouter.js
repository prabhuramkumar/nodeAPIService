const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const Joi = require('joi');
const {userModel} = require('../models/userModel');
const jwt = require('jsonwebtoken');

const userSchemaJoi = {
    email: Joi.string().min(4).required().email(),
    password: Joi.string().min(4).required()
}

const validateUser = (input) => {
    const validationResult =  Joi.validate(input, userSchemaJoi);
    return validationResult.error;
}

router.post('/',  async function (req, res) {
    const error = validateUser(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }

    const user =  await userModel.findOne({email: req.body.email});
    if(!user) return res.status(400).send("Invalid email or password");

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send("Invalid email or password");

    const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, 'thoughtworks');

    res.header('x-Access-Token', token).send("Login success");
});

module.exports = router;