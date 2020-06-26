const User = require('../models/User');
const hashHandler = require('../utils/hashHandler');
const authHandler = require('../utils/authHandler');

function loadLoginPage(req, res) {
    res.render('guest-pages/login.hbs');
}
function loadRegisterPage(req, res) {
    res.render('guest-pages/register.hbs');
}
async function loginHandler(req, res) {
    const { username, password } = req.body;
    if (!username || !password) {
        console.log('Login: Invalid Username or Password!');
        return;
    }
    const user = await User.findOne({ username }).lean();
    if(!user){
        console.log('Login: Invalid Username or Password!');
        return;
    }
    const passwordStatus = await hashHandler.checkPassword(password, user.password);
    if(!passwordStatus){
        console.log('Login: Invalid Username or Password!');
        return;
    }
    res = authHandler.setCookie(res, user);
    res.redirect('/');
}
async function registerHandler(req, res) {
    const { username, password, rePassword } = req.body;

    if (!username || !password || !rePassword) {
        console.log('Register: Invalid Params!');
        return;
    }
    if (password !== rePassword) {
        console.log('Register: Password and Repeat Password must be equal!');
        return;
    }
    const hashedPassword = hashHandler.hashPassword(password);
    const user = new User({ username, password: hashedPassword });
    const status = await user.save();
    if (status) {
        console.log('User registered successfully');
        res = authHandler.setCookie(res, user);
    }
    res.redirect('/');
}
function logoutHandler(req, res){
    res.clearCookie('token');
    res.redirect('/');
}

module.exports = {
    loadLoginPage,
    loadRegisterPage,
    loginHandler,
    registerHandler,
    logoutHandler
}
