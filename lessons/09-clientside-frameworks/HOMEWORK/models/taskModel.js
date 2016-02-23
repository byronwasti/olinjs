var mongoose = require('mongoose');

module.exports = mongoose.model('task', mongoose.Schema({
    text: String,
    time: Number,
    completed: Boolean
}));
