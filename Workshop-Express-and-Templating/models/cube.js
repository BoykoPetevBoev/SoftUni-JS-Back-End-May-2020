const { v4 } = require('uuid');
const {
    getCube,
    getCubes,
    saveCube
} = require('../controllers/database');

class Cube {
    constructor(name, description, imageUrl, difficulty) {
        this.id = v4();
        this.name = name || 'No Name';
        this.description = description || 'There is no description about this cube.';
        this.imageUrl = imageUrl || 'https://www.teknozeka.com/wp-content/uploads/2020/03/wp-header-logo-28.png';
        this.difficulty = difficulty || 0;
    }
    save() {
        const newCube = {
            id: this.id,
            name: this.name,
            description: this.description,
            imageUrl: this.imageUrl,
            difficulty: this.difficulty
        }
        const cubes = getCubes();
        cubes.push(newCube);
        saveCube(cubes);
    }
}

module.exports = Cube;

