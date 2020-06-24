const User = require('../models/User');
const hashHandler = require('../utils/hashHandler');
const authHandler = require('../utils/authHandler');

function loadLoginPage(req, res, next) {
    res.render('user/login', {
        isLoggedIn: res.isLoggedIn
    });
}
function loadRegisterPage(req, res, next) {
    res.render('user/register', {
        isLoggedIn: res.isLoggedIn
    });
}
async function userLogin(req, res, next) {
    const { email, password } = req.body;
    if (!email || !password) {
        return;
    }
    const user = await User.findOne({ email }).lean();
    if (!user) {
        return;
    }
    const match = await hashHandler.checkPassword(password, user.password);
    if (!match) {
        return;
    }
    const token = authHandler.generateToken(user._id, user.email);

    res.cookie('token', token);
    res.redirect('/');
}
async function userRegister(req, res, next) {
    const { email, password, rePassword } = req.body;
    if (!email || !password || rePassword || password !== rePassword) {
        return;
    }
    const hashPassword = hashHandler.hashPassword(password);

    const user = new User({ email, password: hashPassword });
    const userData = await user.save();

    const token = authHandler.generateToken(userData._id, userData.email);

    res.cookie('token', token);
    res.redirect('/');
}
function userLogout(req, res, next) {
    res.clearCookie('token');
    res.redirect('/');
}

module.exports = {
    loadLoginPage,
    loadRegisterPage,
    userRegister,
    userLogin,
    userLogout
}