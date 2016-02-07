var db = require('../db');
var Ingredient = require('../models/ingredientModel');

var routes = {};

routes.list = function(req, res){
    Ingredient.find({}, function(err, ingredients){
        ingredients.sort(function(a, b){
            return a.amount - b.amount;
        });
        res.render('ingredients', {"ingredients":ingredients});
    });
};

routes.add = function(req, res){
    console.log("Got request to add an ingredient");
    
    var ingdt = new Ingredient({name: req.body.name,
             amount: req.body.amount,
             price: req.body.price});

    ingdt.save(function(err, model){
        if(err) return console.error(err);
    });

    res.send(ingdt);
};

routes.remove = function(req, res){
    console.log("Time to remove things!");
    console.log(req.body);

    Ingredient.find({_id: req.body.id}, function(err, ingredient){
        if( err ) return res.send('{}');
        if( ingredient.length == 0 ){
            return res.send('{}');
        }
        ingredient[0].remove();
        res.send(ingredient[0]);
    });
};
routes.plus = function(req, res){
    Ingredient.findOneAndUpdate({_id: req.body.id}, {$inc: {amount: 1}},{}, function(err, ingredients){
        res.send(ingredients);
    });
};
routes.minus = function(req, res){
    Ingredient.findOneAndUpdate({_id: req.body.id}, {$inc: {amount: -1}},{}, function(err, ingredients){
        res.send(ingredients);
    });
};

module.exports = routes;

