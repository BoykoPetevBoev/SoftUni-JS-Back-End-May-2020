const express = require('express');
const mongoose = require('mongoose');
const privateUserData = require('../Workshop-Mongodb-and-Mongoose/private');
const url = `mongodb+srv://${privateUserData.user}:${privateUserData.password}@softuni-dx3ut.mongodb.net/CatShelter?retryWrites=true&w=majority`;
const port = 3000;
const app = express();

const mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
function mongooseStatus(err){
    if (err) {
        console.error(err);
        throw err;
    }
    console.log('Database is setup and running!');
}
mongoose.set('useFindAndModify', false);
mongoose.connect(url , mongooseOptions, mongooseStatus);

require('./config/express')(app);
require('./config/routes')(app);

app.listen(port, console.log(`Server started on port: ${port}!`));