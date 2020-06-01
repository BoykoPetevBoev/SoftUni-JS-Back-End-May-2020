const { getCubes } = require('../controllers/get-cubes');
const { getCubeFromDb } = require('../controllers/database');

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
        console.log(req.params)
    })
    app.get('/details/:id', (req, res) => {
        const id = req.params.id;
        const cube = getCubeFromDb(id);
        res.render('details', {
            ...cube
        })
        
    })
    app.get('*', (req, res) => {
        res.render('404')
    })
};