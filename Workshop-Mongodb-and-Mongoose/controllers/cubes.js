const Cube = require('../models/cube')
 
async function getAllCubes(){
    const cubes = await Cube.find().lean();
    return cubes;
}
async function getCube(id){
    const cubes = await Cube.findById(id).lean();
    return cubes;
}

module.exports = {
    getAllCubes,
    getCube
}