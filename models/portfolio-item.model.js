const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PortfolioItemSchema = new Schema({
    name: {type: String, required: true},
    url: {type: String, required: true},
    image: {type: String, required: true},
    description: {type: String, required: true},
    writeup: {type: String, required: true},
    techStack: {type: Array, default: []}
});

module.exports = mongoose.model('PortfolioItem', PortfolioItemSchema);