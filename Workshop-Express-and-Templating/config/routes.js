const { getCube, getCubes } = require('../controllers/database');
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
        let newData = getCubes()
        if(search){
            newData = newData.filter(item => {
                return item['name']
                .toLowerCase()
                .includes(search.toLowerCase())
            })
        }
        if(from){
            newData = newData.filter(item => {
                return Number(item.difficulty) >= Number(from);
            })
        }
        if(to){
            newData = newData.filter(item => {
                return Number(item.difficulty) <= Number(to);
            })
        }
        res.render('index', {
            cubes: newData
        })
    })
    app.get('*', (req, res) => {
        res.render('404')
    })
};

// function filterArray(arr, filter){
//     if(!arr || !filter){
//         return arr;
//     }
//     const newArray = arr.filter(item => )
// }