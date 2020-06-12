const Cat = require('../models/cat');

async function getAllCats(){
    const cats = await Cat.find().lean();
    return cats;
}
async function getCat(id){
    const cat = await Cat.findById(id).lean();
    return cat;
}

module.exports = {
    getAllCats,
    getCat
}
