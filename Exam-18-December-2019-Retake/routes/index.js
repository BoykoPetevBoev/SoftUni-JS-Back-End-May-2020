const handlers = require('../handlers/index');
const utils = require('../utils/authHandler');

const user = handlers.user;
const tripp = handlers.tripp;

module.exports = (app) => {
    app.get('/',
        utils.userStatus,
        tripp.loadHomePage
    );
    app.get('/shared-tripps',
        utils.userAutorization,
        utils.userStatus,
        tripp.loadSharedTrippsPage
    );
    app.get('/shared-tripps/:id',
        utils.userAutorization,
        utils.userStatus,
        tripp.loadTrippDetails
    )
    app.post('/offer-tripps',
        tripp.offerTrippHandler
    );
    app.get('/offer-tripps',
        utils.userAutorization,
        utils.userStatus,
        tripp.loadOfferTripPage
    );
    app.post('/login',
        user.userLogin
    );
    app.get('/login',
        utils.guestAutorization,
        utils.userStatus,
        user.loadLoginPage
    );
    app.post('/register',
        user.userRegister
    );
    app.get('/register',
        utils.guestAutorization,
        utils.userStatus,
        user.loadRegisterPage
    );
    app.get('/logout',
        user.userLogout
    );
    app.get('*',
        utils.userStatus,
        (req, res, next) => {
            res.render('404');
        })
}