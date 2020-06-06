const { getAllCubes, getCube } = require('../controllers/cubes');
const { searchHandler } = require('../controllers/filter');
const Cube = require('../models/cube');

module.exports = (app) => {
    app.get('/', async (req, res) => {
        res.render('index', {
            cubes: await getAllCubes()
        });
    });
    app.get('/about', (req, res) => {
        res.render('about')
    })
    app.get('/create', (req, res) => {
        res.render('create')
    })
    app.post('/create', (req, res) => {
        const { name, description, imageUrl, difficulty } = req.body;
        const cube = new Cube({
            name,
            description,
            imageUrl,
            difficulty
        });
        cube.save((err) => {
            if (err) return console.error(err);
            console.log('Cube saved successfuly!');
        });
        res.redirect('/');
    })
    app.get('/details/:id',async (req, res) => {
        const id = req.params.id;
        const cube = await getCube(id);
        res.render('details', {
            ...cube
        })
    })
    app.get('/search', (req, res) => {
        // const { search, from, to } = req.query;
        // const filteredData = searchHandler(search, from, to);
        // res.render('index', {
        //     cubes: filteredData
        // })
    })
    app.get('*', (req, res) => {
        res.render('404')
    })
};
