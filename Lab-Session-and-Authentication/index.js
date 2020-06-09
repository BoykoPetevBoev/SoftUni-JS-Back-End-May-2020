const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');

const app = express();
app.use(cookieParser());

app.get('/', (req, res) => {
    res.cookie("message", "My first cookie");

    res.send('<a href="/cookies">Cookies</a><a href="/login">Login</a>')
})
app.get('/cookies', (req, res) => {
    console.log(req.cookies);

    res.send({
        ...req.cookies
    })
})
app.get('/login', (req, res) => {
    res.cookie("user-id", "1465212125");
    res.cookie("token", "98BEbkvScWq0WhHEMq2rsVKmkLGC1XwF");

    const user = {
        username: 'Boyko',
        password: 'parola123'
    }

    const SALT_ROUNDS = 10
    bcrypt.genSalt(SALT_ROUNDS, (err, salt) => {
        console.log('Salt: ', salt);

        bcrypt.hash(user.password, salt, (err, hash) => {
            console.log('Hash: ', hash)
        })
    })


    res.send('Login Siccessful');
})

app.listen(3000, (err) => {
    console.log('Server started')
})