const { v4 } = require('uuid');
const fs = require('fs');
const path = require('path');

class Cube {
    constructor(name, description, imageUrl, difficulty) {
        this.id = v4();
        this.name = name || 'No Name';
        this.description = description || 'There is no description about this cube.';
        this.imageUrl = imageUrl || 'https://www.teknozeka.com/wp-content/uploads/2020/03/wp-header-logo-28.png';
        this.difficulty = difficulty || 0;
    }
    save() {
        const dbPath = path.join(__dirname, '..', 'config/database.json');
        const newCube = {
            id: this.id,
            name: this.name,
            description: this.description,
            imageUrl: this.imageUrl,
            difficulty: this.difficulty
        }
        const jsonData = fs.readFileSync(dbPath, (err, data) => {
            if (err) {
                console.error(err);
                return;
            }
            return data;
        })
        const cubes = JSON.parse(jsonData);
        cubes.push(newCube);
        fs.writeFile(dbPath, JSON.stringify(cubes), err => {
            if (err) {
                console.error(err);
            }
            console.log('Successfully stored');
        })
    }
}

module.exports = Cube;

