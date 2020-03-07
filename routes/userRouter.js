const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const {userModel, validateUser} = require('../models/userModel');


router.get('/',  async function (req, res) {
    const users =  await userModel.find().select('name email');
    res.send(users);
});

router.post('/',  async function (req, res) {
    const error = validateUser(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new userModel(
        {
            name: req.body.name,
            email: req.body.email,
            password: hashPassword
        }
    );
    await newUser.save();
    res.send(true);
});

module.exports = router;