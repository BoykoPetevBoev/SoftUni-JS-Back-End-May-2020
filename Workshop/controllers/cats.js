const Cat = require('../models/cat');
const {getBreed} = require('./breeds');

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
    })
    await cat.save();
    console.log('New cat saved successfuly')
    return res.redirect('/')
}
function loadHomePage(req, res) {
    return res.render('home', {
        cats: req.cats
    });
}
async function loadEditPage(req, res) {
    const id = req.params.id
    const cat = await getCat(id);
    res.render('editCat', {
        breeds: req.breeds,
        ...cat
    });
}
async function loadCatShelterPage(req, res){
    const id = req.params.id;
    const cat = await getCat(id);
    const breed = await getBreed(cat.breed);
    res.render('catShelter', {
        ...cat,
        breed
    })
}

module.exports = {
    getAllCats,
    getCat,
    saveCat,
    loadHomePage,
    loadEditPage,
    loadCatShelterPage
}
