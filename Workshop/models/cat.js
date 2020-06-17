const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CatSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    image: {
        type: String,
        required: true
    },
    breed: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Cat', CatSchema);