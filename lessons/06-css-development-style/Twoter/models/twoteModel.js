var mongoose = require('mongoose');
var User = require('../models/userModel');

module.exports = mongoose.model('twote', mongoose.Schema({
    author: {type: mongoose.Schema.Types.ObjectId, ref:'user'},
    text: String,
    time: Number
}));
