function loadHomePage(req, res) {
    const isLoggedIn = req.isLoggedIn;

    if(isLoggedIn){
        return  res.render('user-pages/home.hbs', {
            isLoggedIn,
            ...req.user
        })
    }
    res.render('guest-pages/home.hbs', {
        isLoggedIn,
    })
}
module.exports = {
    loadHomePage
}