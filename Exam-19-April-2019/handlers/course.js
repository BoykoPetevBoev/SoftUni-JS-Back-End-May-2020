const Course = require('../models/Course');

async function loadHomePage(req, res) {
    const isLoggedIn = req.isLoggedIn;
    const courses = await Course.find().lean();
    if (isLoggedIn) {
        return res.render('home-pages/user-home.hbs', {
            isLoggedIn,
            ...req.user,
            courses
        })
    }
    res.render('home-pages/guest-home.hbs', {
        isLoggedIn,
        courses
    })
}
function loadCreateCoursePage(req, res) {
    res.render('course-pages/create-course.hbs', {
        isLoggedIn: req.isLoggedIn,
        ...req.user
    })
}
async function createCourseHandler(req, res) {
    const { title, description, imageUrl, courseStatus } = req.body;
    if (!title) {
        return invalidData('Title can not be empty!');
    }
    else if (!description) {
        return invalidData('Description can not be empty!');
    }
    else if (!imageUrl) {
        return invalidData('Image Url can not be empty!');
    }
    else if (description.length > 50) {
        return invalidData('Description can not be more than 50 characters!');
    }
    const isPublic = courseStatus === 'on' ? true : false;
    const alreadyCreated = await Course.findOne({ title });
    if (alreadyCreated) {
        return invalidData(`${title} is already created!`);
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
    return res.redirect('/');

    function invalidData(errMessage) {
        return res.render('course-pages/create-course.hbs', {
            isLoggedIn: req.isLoggedIn,
            ...req.user,
            errMessage,
            title,
            description,
            imageUrl
        })
    }
}
async function loadCourseDetails(req, res) {
    const { id } = req.params;
    const course = await Course.findById(id).lean();
    console.log(course)
    res.render('course-pages/course-details.hbs', {
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