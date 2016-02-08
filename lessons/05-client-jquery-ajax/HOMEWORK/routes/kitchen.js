var db = require('../db');
var Ingredient = require('../models/ingredientModel');
var Order = require('../models/orderModel');

var routes = {};


routes.home = function(req, res){
    //Order.remove({});
    Order.find({completion: false}) // Don't care about completed ones right now
        .populate('ingredients.ingredient')
        .exec(function(err, orders){
            priced = orders.map(function(order){
                if( order.ingredients.length == 1 ){
                    if( order.ingredients[0] == null){
                        price = 0;
                    } else{
                        var price = order.ingredients[0].amount * order.ingredients[0].ingredient.price;
                    }
                } else{
                    var nulled = order.ingredients.filter(function(ingredient){
                        return ingredient.ingredient == null;
                    });
                    
                    if( nulled ){
                        return order;
                    }

                    var price = order.ingredients.reduce(function(prev, cur, idx, arr){
                        if( prev.ingredient == null || cur.ingredient == null){
                            return 0;
                        } else {
                            return prev.ingredient.price*prev.amount + cur.ingredient.price*cur.amount;
                        }
                    });
                }

                order.price = "" + price.toFixed(2); // Force 2 decimal places
                return order;
            });

            if(err) console.error(err);

            res.render('kitchen', {"orders":priced});
    });
};

routes.remove = function(req, res){

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
        .exec(function(err, order){
            res.send('Removed');
        });
};

module.exports = routes;
