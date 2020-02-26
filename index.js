const express = require('express');
const morgan = require('morgan');
const config = require('config');
const app = express();
const Joi = require('joi');
const validation = require('./validation');
const port = process.env.port || '4000';
const movieGeneres = [
    {"name": "Thriller","id": "1"},
    {"name": "Romance", "id": "2"},
    {"name": "Drama", "id": "3"}
]

app.use(express.json());
app.use(express.static('public'));
app.use(morgan('tiny'));

console.log(config.get('name'));
console.log(config.get('mail.password'));

const schemaGenereName = {
    name: Joi.string().min(3).required()
}
const schemaGenereID = Joi.number().required();

app.get('/', function (req, res) {
    res.send('Hello World');
});

app.get('/api/generes', function (req, res) {
    res.send(movieGeneres);
});

app.post('/api/generes', function (req, res) {
    if(validation(req.body, schemaGenereName)) {
        const newGenere = {
            id: movieGeneres.length + 1,
            name: req.body.name
        }
        movieGeneres.push(newGenere);
        res.send(newGenere);
    }else{
        res.status(400).send(validationResult.error.details[0].message);
    }
});

app.put('/api/generes/:id', function (req, res) {
    if(validation(req.body, schemaGenereName)) {
        const genere = movieGeneres.find(movie => movie.id === req.params.id);
        if(!genere) {
            res.status(404).send("Genere not found.");
            return;
        }
        genere.name = req.body.name;
        res.send(genere);
    }else{
        res.status(400).send(validationResult.error.details[0].message);
    }
});

app.delete('/api/generes/:id', function (req, res) {
    if(validation(req.params.id, schemaGenereID)) {
        const genere = movieGeneres.find(movie => movie.id === req.params.id);
        if(!genere) {
            res.status(404).send("Genere not found.");
            return;
        }
        const genereIndex = movieGeneres.indexOf(genere);
        movieGeneres.splice(genereIndex, 1);
        res.send(genere);
    }
});

app.listen(port, ()=> {
    console.log("Listening on " + port);
});