const Cube = require('../models/cube');
const Accessory = require('../models/accessory');
const jwt = require('jsonwebtoken');
const { privateKey } = require('../private');
const { getAllAccessories } = require('../controllers/accessories');
const {
    getAllCubes,
    getCube,
    updateCubeAccessories,
    getCubeWithAccesories
} = require('../controllers/cubes');

async function loadHomePage(req, res) {
    return res.render('index', {
        cubes: await getAllCubes(),
        isLoggedIn: req.isLoggedIn
    });
}
function loadAboutpage(req, res) {
    return res.render('about', {
        isLoggedIn: req.isLoggedIn
    })
}
function loadCreatePage(req, res) {
    res.render('create', {
        isLoggedIn: req.isLoggedIn
    })
}
function createCube(req, res) {
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
    return res.redirect('/');
}
function loadAccessoryPage(req, res) {
    res.render('createAccessory', {
        isLoggedIn: req.isLoggedIn
    });
}
function createAccessory(req, res) {
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
}
async function loadAttachAccessoryPage(req, res) {
    const id = req.params.id;
    const cube = await getCube(id);
    const accessories = await getAllAccessories();

    return res.render('attachAccessory', {
        ...cube,
        accessories,
        allAccesoriesAttached: cube.accessories.length === accessories.length,
        isLoggedIn: req.isLoggedIn
    });
}
async function attachAccessory(req, res) {
    const cubeId = req.params.id;
    const accessoryId = req.body.accessory;
    await updateCubeAccessories(cubeId, accessoryId);
    return res.redirect(`/details/${cubeId}`);
}
function loadEditPage(req, res){
    res.render('editCubePage', {
        isLoggedIn: req.isLoggedIn
    });
}
function loadDeletePage(req, res){
    res.render('deleteCubePage', {
        isLoggedIn: req.isLoggedIn
    });
}
async function loadDetailsPage(req, res){
    const id = req.params.id;
        const cube = await getCubeWithAccesories(id);
        res.render('details', {
            ...cube,
            isLoggedIn: req.isLoggedIn
        });
}
function loadErrorPage(req, res){
    return res.render('404');
}

module.exports = {
    loadHomePage,
    loadAboutpage,
    loadCreatePage,
    createCube,
    loadAccessoryPage,
    createAccessory,
    loadAttachAccessoryPage,
    attachAccessory,
    loadEditPage,
    loadDeletePage,
    loadDetailsPage,
    loadErrorPage
}