const express = require('express');
const handlebars = require('express-handlebars');
const homePageRouter = require('./home-page');
const loginPageHandler = require('./login-page');
const app = express();
const port = 3000;

//Insomnia
app.use(express.static('public'));

app.engine('.hbs', handlebars({
    extname: '.hbs'
}))
app.set('view engine', '.hbs')

app.get('/', homePageRouter);
app.get('/home', homePageRouter);
app.get('/login', loginPageHandler);

app.get('/search/:keyword', (req, res) => {
    const keyword = req.params.keyword;
    return res.status(200).send(`Keyword is: ${keyword}`);
})
app.all('/all', (req, res) => {
    return res.send('GET, POST, PUT response');
})
app.get('*', (req, res) => {
    res.send('PAGE NOT FOUND');
})

app.listen(port, (err) => {
    if (err) {
        console.log('ERROR: ', err);
        return;
    }
    console.log(`Server started on port: ${port}`);
});