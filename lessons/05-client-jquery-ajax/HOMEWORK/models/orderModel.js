var mongoose = require('mongoose');
var Ingredient = require('../models/ingredientModel');

var orderSchema = mongoose.Schema({
    ingredients: [{ amount: Number, _ingredient: {type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient'}}],
    completion: Boolean
});

module.exports = mongoose.model('order', orderSchema);
