var mongoose = require('mongoose');

module.exports = mongoose.model('user', mongoose.Schema({
    name: String,
    posts: [ {type: mongoose.Schema.Types.ObjectId, ref:'twote'} ],
    FB_ID: String,
    password: String
}));
