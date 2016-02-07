var mongoose = require('mongoose');

var ingredientSchema = mongoose.Schema({
    name: String,
    price: Number,
    amount: Number
});

module.exports = mongoose.model('ingredient', ingredientSchema);
