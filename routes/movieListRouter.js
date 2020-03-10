const express = require('express');
const router = express.Router();
const {movieModel, validateMovie} = require('../models/movieListModel');
const {genereModel} = require('../models/genereModel');
const auth = require('../middleware/auth');

router.get('/', async function (req, res) {
    const movieList = await movieModel.find().populate('genere', 'name').select('title genere year');
    res.send(movieList);
});

router.post('/', auth, async function (req, res) {
    const error = validateMovie(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }
    
    const genere = await genereModel.findById(req.body.genereID);
    if(!genere) return res.status(400).send('Invalid Genere');
   
    const newMovie = new movieModel(
        {
            title: req.body.title,
            genereID: req.body.genereID,
            year: req.body.year,
            review: req.body.review
        }
    );
    await newMovie.save();
    res.send(newMovie);
    
});

router.put('/:id', async function (req, res) {
    const error = validateMovie(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }

    const movie =  await movieModel.findByIdAndUpdate({_id: req.params.id}, 
        {
        $set: {
            title: req.body.title,
            genere: req.body.genereID,
            year: req.body.year,
            review: req.body.review
        }
    });
    await res.send(movie);
});

router.delete('/:id', async function (req, res) {
    const movie =  await movieModel.findByIdAndDelete({_id: req.params.id});
    await res.send(movie);
});

module.exports = router;