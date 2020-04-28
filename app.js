const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const feedRoutes = require('./routes/feed');

const app = express();

//app.use(bodyParser.urlencoded());
app.use(bodyParser.json());//application/json

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorizaton');
    next();
});

app.use('/feed', feedRoutes);

mongoose.connect('mongodb+srv://tanvir:00000000@cluster0-w7tp8.mongodb.net/messages?retryWrites=true&w=majority')
.then(result => {
    app.listen(8080);
})
.catch(err => console.log(err));


