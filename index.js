const express = require('express');
const morgan = require('morgan');
const config = require('config');
const helmet = require('helmet');
const mongoose = require('mongoose');
const generesRouter = require('./routes/genresRouter');

const app = express();
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

console.log(config.get('name'));

app.use('/api/generes', generesRouter);

app.listen(port, ()=> {
    console.log("Listening on " + port);
});