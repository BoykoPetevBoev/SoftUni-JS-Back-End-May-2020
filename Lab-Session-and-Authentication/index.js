const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const { encodeToken, decodeToken } = require('./auth');

const app = express();
app.use(cookieParser());

app.get('/', (req, res) => {
    res.cookie("name", "value");
    res.send('<a href="/cookies">Cookies</a><a href="/login">Login</a>');
});
app.get('/cookies', (req, res) => {
    console.log(req.cookies);
    res.send({
        ...req.cookies
    });
});
app.get('/login', async (req, res) => {
    const user = {
        _id: 123456789,
        username: 'Boyko',
        password: 'parola123'
    };
    const SALT_ROUNDS = 10;
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hash = await bcrypt.hash(user.password, salt);
    console.log('Password: ', user.password);
    console.log('Salt: ', salt);
    console.log('Hash: ', hash);
    user.hashPassword = hash;
    const token = encodeToken(user);
    res.cookie("TOKEN", token);
    res.send({ ...user });
});
app.get('/token', (req, res) => {
    const jwt = req.cookies['TOKEN'];
    const decodedToken = decodeToken(jwt);

    res.send({
        jwt,
        ...decodedToken
    });
});

app.listen(3000, (err) => {
    console.log('Server started');
});