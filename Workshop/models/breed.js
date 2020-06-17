const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BreedSchema = new Schema({
    breed: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Breed', BreedSchema);