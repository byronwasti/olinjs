var mongoose = require('mongoose');
var Ingredient = require('../models/ingredientModel');

var orderSchema = mongoose.Schema({
    ingredients: [{ amount: Number, ingredient: {type: mongoose.Schema.Types.ObjectId, ref: 'ingredient'}}],
    completion: Boolean
});

module.exports = mongoose.model('order', orderSchema);
