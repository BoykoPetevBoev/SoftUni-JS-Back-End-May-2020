const Cube = require('../models/cube');

async function getAllCubes() {
    const cubes = await Cube.find().lean();
    return cubes;
}
async function getCube(id) {
    const cube = await Cube.findById(id).lean();
    return cube;
}
async function updateCubeAccessories(cubeId, accessoryId) {
    await Cube.findByIdAndUpdate(cubeId, {
        $addToSet: {
            accessories: [accessoryId]
        }
    });
}
async function getCubeWithAccesories(id) {
    const cube = await Cube.findById(id).populate('accessories').lean();
    return cube;
}

module.exports = {
    getAllCubes,
    getCube,
    updateCubeAccessories,
    getCubeWithAccesories
}