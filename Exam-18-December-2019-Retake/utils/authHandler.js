const jwt = require('jsonwebtoken');
const privateKey = require('../config/config')['tokenKey']

function generateToken(id, email) {
    const token = jwt.sign({
        id,
        email
    }, privateKey);
    return token;
}
function setCookie(token) {
    return res.cookie('token', token)
}
function userAutorization(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.redirect('/');
    }
    try {
        const info =  jwt.verify(token, privateKey);
        res.user = info;
        next();
    }
    catch{
        return res.redirect('/');
    }
}
function guestAutorization(req, res, next) {
    const token = req.cookies.token;
    try {
        jwt.verify(token, privateKey);
        return res.redirect('/');
    }
    catch{
        next();
    }
}
function userStatus(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        res.isLoggedIn = false;
    }
    try {
        const info = jwt.verify(token, privateKey);
        res.user = info;
        res.isLoggedIn = true;
    }
    catch{
        res.isLoggedIn = false;
    }
    next();
}


module.exports = {
    generateToken,
    setCookie,
    userAutorization,
    userStatus,
    guestAutorization
}
