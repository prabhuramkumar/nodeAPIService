require('express-async-errors');
const error = require('./middleware/errorMiddleware');
const express = require('express');
const morgan = require('morgan');
const config = require('config');
const helmet = require('helmet');
const mongoose = require('mongoose');
const generesRouter = require('./routes/genresRouter');
const movieListRouter = require('./routes/movieListRouter');
const userRouter = require('./routes/userRouter');
const authentication = require('./routes/auth');

const app = express();
const port = process.env.port || '4000';

app.use(express.json());
app.use(express.static('public'));
app.use(morgan('tiny'));
app.use(helmet());

mongoose.connect('mongodb+srv://admin:admin@cluster0-ns02p.mongodb.net/movieDB?retryWrites=true&w=majority').then(() => {
    console.log("connected to mongoDB");
}).catch(e => {
    console.log("Error connecting to mongoDB");
});

console.log(config.get('name'));

app.use('/api/generes', generesRouter);
app.use('/api/movies', movieListRouter);
app.use('/api/register', userRouter);
app.use('/api/auth', authentication);
app.use(error);

app.listen(port, ()=> {
    console.log("Listening on " + port);
});