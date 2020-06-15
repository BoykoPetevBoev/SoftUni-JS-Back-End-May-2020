const Cube = require('../models/cube');
const Accessory = require('../models/accessory');
const jwt = require('jsonwebtoken');
const { getAllCubes, getCube, updateCubeAccessories, getCubeWithAccesories } = require('../controllers/cubes');
const { getAllAccessories } = require('../controllers/accessories');
const { searchHandler } = require('../controllers/filter');
const { addUser, verifyUser, guestAuthorization, userAuthorization, getUserStatus } = require('../controllers/users');
const { privateKey } = require('../private');

module.exports = (app) => {
    app.get('/', getUserStatus, async (req, res) => {
        res.render('index', {
            cubes: await getAllCubes(),
            isLoggedIn: req.isLoggedIn
        });
    });
    app.get('/about', getUserStatus, (req, res) => {
        res.render('about', {
            isLoggedIn: req.isLoggedIn
        })
    })
    app.get('/create', getUserStatus, guestAuthorization, (req, res) => {
        res.render('create', {
            isLoggedIn: req.isLoggedIn
        })
    })
    app.post('/create', (req, res) => {
        const { name, description, imageUrl, difficulty } = req.body;
        const token = req.cookies.token;
        const decodet = jwt.verify(token, privateKey);
        const cube = new Cube({
            name,
            description,
            imageUrl,
            difficulty,
            creatorId: decodet.userID
        });

        cube.save((err) => {
            if (err) return console.error(err);
            console.log('Cube saved successfuly!');
        });
        res.redirect('/');
    })
    app.get('/create/accessory', getUserStatus, guestAuthorization, (req, res) => {
        res.render('createAccessory', {
            isLoggedIn: req.isLoggedIn
        });
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
    app.get('/details/:id', getUserStatus, async (req, res) => {
        const id = req.params.id;
        const cube = await getCubeWithAccesories(id);
        res.render('details', {
            ...cube,
            isLoggedIn: req.isLoggedIn
        });
    })
    app.get('/attach/accessory/:id', getUserStatus, guestAuthorization, async (req, res) => {
        const id = req.params.id;
        const cube = await getCube(id);
        const accessories = await getAllAccessories();

        res.render('attachAccessory', {
            ...cube,
            accessories,
            allAccesoriesAttached: cube.accessories.length === accessories.length,
            isLoggedIn: req.isLoggedIn
        });
    })
    app.post('/attach/accessory/:id', async (req, res) => {
        const cubeId = req.params.id;
        const accessoryId = req.body.accessory;
        await updateCubeAccessories(cubeId, accessoryId);
        res.redirect(`/details/${cubeId}`);
    })
    app.get('/search', getUserStatus, async (req, res) => {
        const { search, from, to } = req.query;
        const filteredData = await searchHandler(search, from, to);
        res.render('index', {
            cubes: filteredData,
            isLoggedIn: req.isLoggedIn
        })
    })
    app.get('/login', userAuthorization, getUserStatus, (req, res) => {
        res.render('loginpage', {
            isLoggedIn: req.isLoggedIn
        });
    })
    app.post('/login', verifyUser);
    app.get('/register', userAuthorization, getUserStatus, (req, res) => {
        res.render('registerPage', {
            isLoggedIn: req.isLoggedIn
        });
    })
    app.post('/register', addUser);
    app.get('/edit', guestAuthorization, (req, res) => {
        res.render('editCubePage', {
            isLoggedIn: req.isLoggedIn
        });
    })
    app.get('/delete', guestAuthorization, getUserStatus, (req, res) => {
        res.render('deleteCubePage', {
            isLoggedIn: req.isLoggedIn
        });
    })
    app.get('/logout', guestAuthorization, getUserStatus, (req, res) => {
        res.redirect('/'); //TODO...
    })
    app.get('*', (req, res) => {
        res.render('404')
    })
};
