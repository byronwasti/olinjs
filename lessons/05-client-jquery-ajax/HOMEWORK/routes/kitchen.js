var db = require('../db');
var Ingredient = require('../models/ingredientModel');
var Order = require('../models/orderModel');

var routes = {};

routes.home = function(req, res){
    Order.find({completion: false}) // Don't care about completed ones right now
        .populate('ingredients.ingredient')
        .exec(function(err, orders){
            if(err) console.error(err);

            // Aw yeh, functional programming
            priced = orders.map(function(order){

                // Check if an ingredient was deleted which is needed
                var nulled = order.ingredients.filter(function(ingredient){ return ingredient.ingredient == undefined });
                if( !nulled ){
                    // Could have better error handling
                    console.error("underfined ingredient!");
                    console.log(nulled);
                    return order;
                }

                var price = order.ingredients.reduce(function(prev, cur, idx, arr){
                    return prev + cur.ingredient.price*cur.amount;
                }, 0);
                
                order.price = "" + price.toFixed(2); // Force it to be pretty
                return order;
            });

            res.render('kitchen', {"orders":priced});
    });
};

routes.remove = function(req, res){
    Order.remove({_id: req.body._id})
        .exec(function(err, ingredient){
            res.send('Removed');
        });
};

routes.complete = function(req, res){
    Order.findOneAndUpdate({_id: req.body._id}, {completion: true})
        .exec(function(err, order){
            res.send('Removed');
        });
};

module.exports = routes;
