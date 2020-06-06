const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccessotySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        maxlength: 100
    },
    cubes: [{
        type: 'ObjectID',
        ref: 'Cube'
    }]
});

module.exports = mongoose.model('Accessory', AccessotySchema); 