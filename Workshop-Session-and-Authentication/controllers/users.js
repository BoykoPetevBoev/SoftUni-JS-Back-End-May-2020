const User = require('../models/user');
const privateData = require('../private');
const bscrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const privateKey = privateData.privateKey;

async function addUser(req, res) {
    const { username, password } = req.body;

    const salt = bscrypt.genSaltSync(10);
    const hashPassword = bscrypt.hashSync(password, salt);

    const user = new User({ username, password: hashPassword });
    const userData = await user.save();

    const token = jwt.sign({
        userID: userData._id,
        username: userData.username
    }, privateKey);
    res.cookie('token', token);

    res.redirect('/');
}
async function verifyUser(req, res) {
    const { username, password } = req.body;
    const user = await User.findOne({ username }).lean();
    if (!user) {
        return res.redirect('/login');
    }
    const match = await bscrypt.compare(password, user.password);
    if (!match) {
        return res.redirect('/login');
    }
    const token = jwt.sign({
        userID: user._id,
        username: user.username
    }, privateKey);
    res.cookie('token', token);

    res.redirect('/');
}
function guestAuthorization(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.redirect('/');
    }
    try {
        const user = jwt.verify(token, privateKey);
        next();
    }
    catch (e) {
        return res.redirect('/');
    }
}
function userAuthorization(req, res, next) {
    const token = req.cookies.token;
    try {
        const user = jwt.verify(token, privateKey);
        return res.redirect('/');
    }
    catch {
        next();
    }
}
function getUserStatus(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        req.isLoggedIn = false;
    }   
    try {
        const user = jwt.verify(token, privateKey);
        req.isLoggedIn = true;
    }
    catch {
        req.isLoggedIn = false;
    }
    next();
}

module.exports = {
    addUser,
    verifyUser,
    guestAuthorization,
    userAuthorization,
    getUserStatus
}