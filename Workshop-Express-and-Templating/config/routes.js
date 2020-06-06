const { getCube, getCubes } = require('../controllers/database');
const { searchHandler } = require('../controllers/filter');
const Cube = require('../models/cube');

module.exports = (app) => {
    app.get('/', (req, res) => {
        res.render('index', {
            cubes: getCubes()
        });
    });
    app.get('/about', (req, res) => {
        res.render('about')
    })
    app.get('/create', (req, res) => {
        res.render('create')
    })
    app.post('/create', (req, res) => {
        const { name, description, imageUrl, difficultyLevel } = req.body;
        const cube = new Cube(name, description, imageUrl, difficultyLevel);
        cube.save();
        res.redirect('/');
    })
    app.get('/details/:id', (req, res) => {
        const id = req.params.id;
        const cube = getCube(id);
        res.render('details', {
            ...cube
        })
    })
    app.get('/search', (req, res) => {
        const { search, from, to } = req.query;
        const filteredData = searchHandler(search, from, to);
        res.render('index', {
            cubes: filteredData
        })
    })
    app.get('*', (req, res) => {
        res.render('404')
    })
};
