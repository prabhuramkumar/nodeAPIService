const express = require('express');
const app = express();
const Joi = require('joi');
const port = process.env.port || '4000';
const movieGeneres = [
    {"name": "Thriller","id": "1"},
    {"name": "Romance", "id": "2"},
    {"name": "Drama", "id": "3"}
]

app.use(express.json());

const validationGenereName = (input, res) => {
    const schema = {
        name: Joi.string().min(3).required()
    }
    const validationResult =  Joi.validate(input, schema);
    if(validationResult.error){
        res.status(400).send(validationResult.error.details[0].message)
        return false;
    }
    return true;
}

const validationGenereID = (input, res) => {
    const schema = Joi.number().required();
    
    const validationResult =  Joi.validate(input, schema);
    if(validationResult.error){
        res.status(400).send(validationResult.error.details[0].message)
        return false;
    }
    return true;
}

app.get('/', function (req, res) {
    res.send('Hello World');
});

app.get('/api/generes', function (req, res) {
    res.send(movieGeneres);
});

app.post('/api/generes', function (req, res) {
    if(validationGenereName(req.body, res)) {
        const newGenere = {
            id: movieGeneres.length + 1,
            name: req.body.name
        }
        movieGeneres.push(newGenere);
        res.send(newGenere);
    }
});

app.put('/api/generes/:id', function (req, res) {
    if(validationGenereName(req.body, res)) {
        const genere = movieGeneres.find(movie => movie.id === req.params.id);
        if(!genere) {
            res.status(404).send("Genere not found.");
            return;
        }
        genere.name = req.body.name;
        res.send(genere);
    }
});

app.delete('/api/generes/:id', function (req, res) {
    if(validationGenereID(req.params.id, res)) {
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