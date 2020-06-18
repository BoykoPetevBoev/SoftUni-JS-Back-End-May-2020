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
        required: true,
        type: 'ObjectId',
        ref: 'Breed'
    }
});

module.exports = mongoose.model('Cat', CatSchema);