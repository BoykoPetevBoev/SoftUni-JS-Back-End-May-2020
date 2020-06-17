const Cat = require('../models/cat');

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
async function loadHomePage(req, res){
    return res.render('home', {
        cats: req.cats
    });
}

module.exports = {
    getAllCats,
    getCat,
    saveCat,
    loadHomePage
}
