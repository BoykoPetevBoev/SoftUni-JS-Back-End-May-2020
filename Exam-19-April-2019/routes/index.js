const user = require('../handlers/user');
const course = require('../handlers/course');
const authHandler = require('../utils/authHandler');

module.exports = (app) => {
    app.get('/',
        authHandler.userStatus,
        course.loadHomePage
    );
    app.get('/create-course',
        authHandler.userAutorization,
        authHandler.userStatus,
        course.loadCreateCoursePage
    );
    app.post('/create-course',
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
        user.loginHandler
    );
    app.post('/register',
        user.registerHandler
    );
    app.post('/logout',
        user.logoutHandler
    )
}
