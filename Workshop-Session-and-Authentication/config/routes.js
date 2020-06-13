const Cube = require('../models/cube');
const Accessory = require('../models/accessory');
const { getAllCubes, getCube, updateCubeAccessories, getCubeWithAccesories } = require('../controllers/cubes');
const { getAllAccessories } = require('../controllers/accessories');
const { searchHandler } = require('../controllers/filter');
const { addUser, verifyUser } = require('../controllers/users');

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
    app.get('/create/accessory', (req, res) => {
        res.render('createAccessory');
    })
    app.post('/create/accessory', (req, res) => {
        const { name, description, imageUrl } = req.body;
        const accessory = new Accessory({
            name,
            description,
            imageUrl
        });
        accessory.save((err) => {
            if (err) return console.error(err);
            console.log('Accessory saved successfuly!');
        })
        res.redirect('/');
    })
    app.get('/details/:id', async (req, res) => {
        const id = req.params.id;
        const cube = await getCubeWithAccesories(id);
        res.render('details', {
            ...cube
        });
    })
    app.get('/attach/accessory/:id', async (req, res) => {
        const id = req.params.id;
        const cube = await getCube(id);
        const accessories = await getAllAccessories();

        res.render('attachAccessory', {
            ...cube,
            accessories,
            allAccesoriesAttached: cube.accessories.length === accessories.length
        });
    })
    app.post('/attach/accessory/:id', async (req, res) => {
        const cubeId = req.params.id;
        const accessoryId = req.body.accessory;
        await updateCubeAccessories(cubeId, accessoryId);
        res.redirect(`/details/${cubeId}`);
    })
    app.get('/search', async (req, res) => {
        const { search, from, to } = req.query;
        const filteredData = await searchHandler(search, from, to);
        res.render('index', {
            cubes: filteredData
        })
    })
    app.get('/login', (req, res) => {
        res.render('loginpage');
    })
    app.post('/login', verifyUser);
    app.get('/register', (req, res) => {
        res.render('registerpage');
    })
    app.post('/register', addUser);
    app.get('/edit', (req, res) => {
        res.render('editCubePage');
    })
    app.get('/delete', (req, res) => {
        res.render('deleteCubePage');
    })
    app.get('*', (req, res) => {
        res.render('404')
    })
};
