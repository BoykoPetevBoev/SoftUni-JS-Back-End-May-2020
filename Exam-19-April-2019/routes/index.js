const user = require('../handlers/user');
const course = require('../handlers/course');
const authHandler = require('../utils/authHandler');

module.exports = (app) => {
    app.get('/',
        authHandler.userStatus,
        course.loadHomePage
    );
    app.get('/course/create',
        authHandler.userAutorization,
        authHandler.userStatus,
        course.loadCreateCoursePage
    );
    app.post('/course/create',
        authHandler.userAutorization,
        authHandler.userStatus,
        course.createCourseHandler
    )
    app.get('/course/:id',
        authHandler.userAutorization,
        authHandler.userStatus,
        course.loadCourseDetails
    )
    app.get('/login',
        authHandler.guestAutorization,
        authHandler.userStatus,
        user.loadLoginPage
    );
    app.get('/register',
        authHandler.guestAutorization,
        authHandler.userStatus,
        user.loadRegisterPage
    );
    app.post('/login',
        authHandler.guestAutorization,
        authHandler.userStatus,
        user.loginHandler
    );
    app.post('/register',
        authHandler.guestAutorization,
        authHandler.userStatus,
        user.registerHandler
    );
    app.get('/logout',
        user.logoutHandler
    )
}
