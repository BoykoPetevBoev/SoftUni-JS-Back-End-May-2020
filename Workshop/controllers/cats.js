const Cat = require('../models/cat');
const { getBreed } = require('./breeds');

async function getAllCats(req, res, next) {
    req.cats = await Cat.find().lean();
    next();
}
async function getCat(id) {
    const cat = await Cat.findById(id).lean();
    return cat;
}
async function saveCat(req, res) {
    const { name, description, image, breed } = req.body;
    const cat = new Cat({
        name,
        description,
        image,
        breed
    });
    await cat.save();
    console.log('New cat saved successfuly!');
    return res.redirect('/');
}
async function loadHomePage(req, res) {
    const cats = req.cats;
    return res.render('home', {
        cats
    });
}
async function loadEditPage(req, res) {
    const id = req.params.id
    const cat = await getCat(id);
    const breeds = req.breeds;
    res.render('editCat', {
        breeds,
        ...cat
    });
}
async function loadCatShelterPage(req, res) {
    const id = req.params.id;
    const cat = await getCat(id);
    const breed = await getBreed(cat.breed);
    res.render('catShelter', {
        ...cat,
        breed
    })
}
async function updateCat(req, res) {
    const _id = req.params.id;
    const { name, description, image, breed } = req.body;
    await Cat.findOneAndUpdate({ _id }, {
        name,
        description,
        image,
        breed
    });
    console.log('Cat updated successfuly!')
    return res.redirect('/');
}
async function deleteCat(req, res) {
    const _id = req.params.id;
    await Cat.findOneAndDelete({ _id });
    console.log('Cat deleted successfuly!')
    res.redirect('/')
}

module.exports = {
    getAllCats,
    getCat,
    saveCat,
    loadHomePage,
    loadEditPage,
    loadCatShelterPage,
    updateCat,
    deleteCat
}
