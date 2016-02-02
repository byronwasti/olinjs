var mongoose = require('mongoose');

var catSchema = mongoose.Schema({
    name: String,
    color: String,
    age: Number
});

module.exports = mongoose.model("cat", catSchema);
