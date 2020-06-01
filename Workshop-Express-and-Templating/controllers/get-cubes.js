const { getCubesFromDb, getCubeFromDb } = require('../controllers/database');

function getCubes() {
    const cubes = getCubesFromDb();
    return cubes;
}

module.exports = {
    getCubes
}