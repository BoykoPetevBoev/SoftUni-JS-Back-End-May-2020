const { saveCat, getAllCats, loadEditPage, loadHomePage, loadCatShelterPage, updateCat, deleteCat } = require("../controllers/cats");
const { addBreed, getAllBreeds } = require('../controllers/breeds');

module.exports = (app) => {
    app.get('/', getAllCats, loadHomePage);
    app.get('/addBreed', (req, res) => {
        res.render('addBreed');
    });
    app.post('/addBreed', addBreed);
    app.get('/addCat', getAllBreeds, (req, res) => {
        res.render('addCat', {
            breeds: req.breeds
        });
    });
    app.post('/addCat', saveCat);
    app.get('/edit/:id', getAllBreeds, loadEditPage);
    app.post('/edit/:id', updateCat);
    app.get('/newHome/:id', loadCatShelterPage);
    app.post('/newHome/:id', deleteCat)
    app.get('*', (req, res) => {
        res.render('404');
    });
}