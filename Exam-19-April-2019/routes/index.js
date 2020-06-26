const user = require('../handlers/user');
const home = require('../handlers/home');
const authHandler = require('../utils/authHandler');

module.exports = (app) => {
    app.get('/',
        authHandler.userStatus,
        home.loadHomePage
    );
    app.get('/login',
        authHandler.guestAutorization,
        user.loadLoginPage
    );
    app.get('/register',
        authHandler.guestAutorization,
        user.loadRegisterPage
    );
    app.post('/login',
        user.loginHandler
    );
    app.post('/register',
        user.registerHandler
    );
    app.post('/logout',
        user.logoutHandler
    )
}
