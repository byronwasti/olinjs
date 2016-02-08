var db = require('../db');
var mongoose = require('mongoose');
var Ingredient = require('../models/ingredientModel');
var Order = require('../models/orderModel');

var routes = {};

routes.home = function(req, res){
    Ingredient.find({amount: {$gt: 0} }, function(err, ingredients){
        ingredients.sort(function(a, b){
            return a.price - b.price;
        });
        res.render('order', {"ingredients":ingredients});
    });
};


routes.add = function(req, res){
    var ingredients = [];
    var keys = Object.keys(req.body);
    for( var i=0; i < keys.length; i++){
        if( req.body[keys[i]] == 0 ){
            continue;
        }
        ingredients.push({ amount: req.body[keys[i]], ingredient: mongoose.Types.ObjectId(keys[i])});
    }

    if( ingredients.length == 0 ){
        return res.send('{}');
    }

    var order = new Order({ ingredients: ingredients, completion: false});

    order.save(function(err, model){
        model.ingredients.map(function(ingredient){
            Ingredient.findOneAndUpdate({_id: ingredient.ingredient}, {$inc: {amount: -ingredient.amount}}, {}, function(err, ingred){
                if(err){
                    console.error(err);
                }
            });
        });

        if(err){
            console.error(err);
            return res.send('{}');
        } 

        return res.send('sucess!');
    });
};

module.exports = routes;

