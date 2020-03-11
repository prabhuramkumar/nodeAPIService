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
const login = require('./routes/loginRouter');

const app = express();
const port = process.env.port || '4000';

app.use(express.json());
app.use(express.static('public'));
app.use(morgan('tiny'));
app.use(helmet());

const envName = config.get('name');
const db = config.get('dbConnection');
mongoose.connect(db).then(() => {
    console.log("connected to", envName);
}).catch(e => {
    console.log("Error connecting to mongoDB");
});

app.use('/api/generes', generesRouter);
app.use('/api/movies', movieListRouter);
app.use('/api/register', userRouter);
app.use('/api/login', login);
app.use(error);

const server = app.listen(port, ()=> {
    console.log("Listening on " + port);
});
module.exports = server;