
module.exports = (app) => {
    app.get('/', (req, res) => {
        res.render('home');
    });
    app.get('/addBreed', (req, res) => {
        res.render('addBreed');
    });
    app.get('/addCat', (req, res) => {
        res.render('addCat');
    });
    app.post('/addCat', (req, res) => {
        console.log(req.body);
    })
    app.get('*', (req, res) => {
        res.render('404');
    });
}