const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');

module.exports = (app) => {

    app.engine('.hbs', handlebars());
    app.set('view engine', '.hbs');

    //TODO: Setup the body parser

    //TODO: Setup the static files

};