const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const app = express();
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

if(process.env.NODE_ENV !== 'test'){
    mongoose.connect('mongodb://localhost/muber', { useNewUrlParser: true, useFindAndModify: false });
}

app.use(bodyParser.json());
routes(app);

app.use((err, req, res, next) => {
    res.status(422).send({ error: err.message });
})

module.exports = app;