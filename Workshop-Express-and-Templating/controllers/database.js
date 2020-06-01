const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, '..', 'config/database.json');

function getCubesFromDb(){
   const jsonData=  fs.readFileSync(dbPath, (err, data) => {
        if (err) {
            console.error(err);
            return [];
        }
        return data;
    })
    return JSON.parse(jsonData);
}
function getCubeFromDb(id){
    const cubes = getCubesFromDb();
    const cube = cubes.filter(c => c.id === id).shift();
    return cube;
}
getCubeFromDb("3841d492-099d-4496-a9aa-2aafc8023e1b")
function saveCubeInDb(data){
    fs.writeFile(dbPath, JSON.stringify(data), err => {
        if (err) {
            console.error(err);
        }
        console.log('Successfully stored');
    })
}

module.exports = {
    getCubeFromDb,
    getCubesFromDb,
    saveCubeInDb
}
