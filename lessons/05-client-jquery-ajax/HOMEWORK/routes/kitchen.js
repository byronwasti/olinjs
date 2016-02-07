var db = require('../db');
var Ingredient = require('../models/ingredientModel');
var Order = require('../models/orderModel');

var routes = {};


routes.home = function(req, res){
    Order.find({})
        .populate('ingredients.ingredient')
        .exec(function(err, orders){
            if(err) console.error(err);
            res.render('kitchen', {"orders":orders});
    });
};

routes.remove = function(req, res){
    console.log(req.body._id);
    Ingredient.find({_id:req.body._id}, function(err, out){
        console.log(out);
    });
    Order.remove({_id: req.body._id})
        .exec(function(err, ingredient){
            res.send('Removed');
        });
};

routes.complete = function(req, res){
    Order.findOneAndUpdate({_id: req.body._id}, {completion: true})
        .exec(function(err, ingredient){
            res.send('Removed');
        });
};

module.exports = routes;
