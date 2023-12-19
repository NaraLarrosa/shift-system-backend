const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const specialtySchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    }
});

specialtySchema.plugin(uniqueValidator);

module.exports = mongoose.model('Specialty', specialtySchema);