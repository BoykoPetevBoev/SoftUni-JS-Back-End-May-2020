// const { getCube, getCubes } = require('../controllers/database');

// function searchHandler(search, from, to) { 
//     let data = getCubes();
//     if(search){
//         data = data.filter(item => {
//             return item['name']
//             .toLowerCase()
//             .includes(search.toLowerCase())
//         })
//     }
//     if(from){
//         data = data.filter(item => {
//             return Number(item.difficulty) >= Number(from);
//         })
//     }
//     if(to){
//         data = data.filter(item => {
//             return Number(item.difficulty) <= Number(to);
//         })
//     }
//     return data;
// }
// module.exports = { searchHandler };