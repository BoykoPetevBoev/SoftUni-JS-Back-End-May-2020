const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
        maxlength: 50
    },
    imageUrl: {
        type: String,
        required: true
    },
    isPublic: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: String,
        required: true
    },
    creator: {
        type: 'ObjectID',
        ref: 'User'
    },
    usersEnrolled: [{
        type: 'ObjectID',
        ref: 'User'
    }]

})

module.exports = mongoose.model('Course', CourseSchema);