const Breed = require('../models/breed');
const breed = require('../models/breed');

async function addBreed(req, res) {
    const breed = new Breed({
        breed: req.body.breed
    })
    await breed.save();
    console.log('New breed saved successfuly!')
    res.redirect('/');
}
async function getAllBreeds(req, res, next) {
    req.breeds = await Breed.find().lean();
    next();
}
async function getBreed(id) {
    const breed = await Breed.findById(id).lean();
    return breed
}

module.exports = {
    getAllBreeds,
    addBreed,
    getBreed
}