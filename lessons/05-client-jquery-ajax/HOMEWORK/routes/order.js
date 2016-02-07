var db = require('../db');
var mongoose = require('mongoose');
var Ingredient = require('../models/ingredientModel');
var Order = require('../models/orderModel');

var routes = {};

routes.home = function(req, res){
    Ingredient.find({}, function(err, ingredients){
        ingredients.sort(function(a, b){
            return a.price - b.price;
        });
        res.render('order', {"ingredients":ingredients});
    });
};


routes.add = function(req, res){
    console.log(req.body);
    console.log(Object.keys(req.body));
    var ingredients = [];
    var keys = Object.keys(req.body);
    for( var i=0; i < keys.length; i++){
        if( req.body[keys[i]] == 0 ){
            continue;
        }
        ingredients.push({ amount: req.body[keys[i]], ingredient: mongoose.Types.ObjectId(keys[i])});
        //ingredients.push({ amount: req.body[keys[i]], ingredient: Number(keys[i])});
    }

    if( ingredients.length == 0 ){
        return res.send('{}');
    }

    var order = new Order({ ingredients: ingredients, completion: false});
    order.save(function(err, model){
        if(err) return res.send('{}');

        return res.send('sucess!');
    });
};

routes.complete = function(req, res){

};

module.exports = routes;

