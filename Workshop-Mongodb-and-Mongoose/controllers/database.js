const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, '..', 'config/database.json');

function getCubes(){
   const jsonData=  fs.readFileSync(dbPath, (err, data) => {
        if (err) {
            console.error(err);
            return [];
        }
        return data;
    })
    return JSON.parse(jsonData);
}
function getCube(id){
    const cubes = getCubes();
    const cube = cubes.filter(c => c.id === id).shift();
    return cube;
}
getCube("3841d492-099d-4496-a9aa-2aafc8023e1b")
function saveCube(data){
    fs.writeFile(dbPath, JSON.stringify(data), err => {
        if (err) {
            console.error(err);
        }
        console.log('Successfully stored');
    })
}

module.exports = {
    getCube,
    getCubes,
    saveCube
}
