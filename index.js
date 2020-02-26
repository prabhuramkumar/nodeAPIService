const express = require('express');
const morgan = require('morgan');
const config = require('config');
const helmet = require('helmet');
const mongoose = require('mongoose');

const app = express();
const Joi = require('joi');
const validation = require('./validation');
const port = process.env.port || '4000';

app.use(express.json());
app.use(express.static('public'));
app.use(morgan('tiny'));
app.use(helmet());

mongoose.connect('mongodb://localhost/genereList').then(() => {
    console.log("connected to mongoDB localhost");
}).catch(e => {
    console.log("Error connecting to mongoDB localhost");
});

const genereSchema = new mongoose.Schema({
    id: Number,
    name: String
});

const genereModel = new mongoose.model('genere', genereSchema);

console.log(config.get('name'));

const schemaGenereName = {
    name: Joi.string().min(3).required()
}
const schemaGenereID = Joi.string().min(7).required();

app.get('/', function (req, res) {
    res.send('Hello World');
});

app.get('/api/generes', async function (req, res) {
    const movieGeneresList = await genereModel.find();
    res.send(movieGeneresList);
});

app.post('/api/generes', async function (req, res) {
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

app.put('/api/generes/:id', async function (req, res) {
    if(validation(req.body, schemaGenereName)) {
        const genere =  await genereModel.findByIdAndUpdate({_id: req.params.id}, {$set: {name: req.body.name}});
        res.send(genere);
    }else{
        res.status(400).send("Validation Error");
    }
});

app.delete('/api/generes/:id', async function (req, res) {
    if(validation(req.params.id, schemaGenereID)) {
        const genere =  await genereModel.findByIdAndDelete({_id: req.params.id});
        res.send(genere);
    }
});

app.listen(port, ()=> {
    console.log("Listening on " + port);
});