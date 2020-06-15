function loadLoginPage(req, res) {
    return res.render('loginpage', {
        isLoggedIn: req.isLoggedIn
    });
}
function loadRegisterPage(req, res){
    return res.render('registerPage', {
        isLoggedIn: req.isLoggedIn
    });
}
function logoutUser(req, res){
    res.clearCookie('token');
    return res.redirect('/');
}

module.exports = {
    loadLoginPage,
    loadRegisterPage,
    logoutUser
}