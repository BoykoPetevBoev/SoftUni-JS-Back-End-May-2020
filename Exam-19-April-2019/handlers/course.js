const Course = require('../models/Course');

async function loadHomePage(req, res) {
    const isLoggedIn = req.isLoggedIn;
    const courses = await Course.find().lean();
    if (isLoggedIn) {
        return res.render('user-pages/home.hbs', {
            isLoggedIn,
            ...req.user,
            courses
        })
    }
    res.render('guest-pages/home.hbs', {
        isLoggedIn,
        courses
    })
}
function loadCreateCoursePage(req, res) {
    res.render('admin-pages/course-create.hbs', {
        isLoggedIn: req.isLoggedIn,
        ...req.user
    })
}
async function createCourseHandler(req, res) {
    const { title, description, imageUrl, courseStatus } = req.body;
    if (!title || !description || !imageUrl || description.length > 50) {
        console.log('CreateCourse: Invalid params!');
        return;
    }
    let isPublic = false;
    if (courseStatus === 'on') {
        isPublic = true;
    }
    const createdAt = new Date().toISOString().slice(0, 10);
    const creator = req.user._id;
    const course = new Course({
        title,
        description,
        imageUrl,
        isPublic,
        createdAt,
        creator
    });
    const status = await course.save();
    if (status) {
        console.log('New course created successfully');
    }
    res.redirect('/');
}
async function loadCourseDetails(req, res) {
    const { id } = req.params;
    const course = await Course.findById(id).lean();
    console.log(course)
    res.render('user-pages/details-not-enrolled-in.hbs', {
        isLoggedIn: req.isLoggedIn,
        ...req.user,
        ...course
    })
}

module.exports = {
    loadHomePage,
    loadCreateCoursePage,
    createCourseHandler,
    loadCourseDetails
}