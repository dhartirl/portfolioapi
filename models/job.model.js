const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let JobSchema = new Schema({
    title: {type: String, required: true},
    employer: {type: String, required: true},
    address: {type: String, required: true},
    dates: {type: String, required: true},
    bullets: {type: Array, required: true},
});

module.exports = mongoose.model('Job', JobSchema);