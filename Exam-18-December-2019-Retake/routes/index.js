const handlers = require('../handlers/index');
const utils = require('../utils/authHandler');

const user = handlers.user;
const tripp = handlers.tripp;

module.exports = (app) => {
    app.get('/', utils.userStatus, tripp.loadHomePage);
    app.get('/shared-tripps', utils.userAutorization, utils.userStatus, tripp.loadSharedTrippsPage);
    app.get('/offer-tripp', utils.userAutorization, utils.userStatus, tripp.loadOfferTripPage);
    app.post('/offer-tripp', tripp.offerTrippHandler)

    app.get('/login', utils.guestAutorization, utils.userStatus, user.loadLoginPage);
    app.get('/register', utils.guestAutorization, utils.userStatus, user.loadRegisterPage);
    app.get('/logout', user.userLogout);


    app.post('/register', user.userRegister);
    app.post('/login', user.userLogin);

    app.get('*', utils.userStatus, (req, res, next) => {
        res.render('404');
    })
}