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
    
    console.log(req.body);
    var ingdt = new Ingredient({name: req.body.name,
             amount: req.body.amount?req.body.amount:0,
             price: req.body.price?req.body.price:0});

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

routes.edit = function(req, res){
    console.log(req.body);
    switch(req.body.type){
        case 'name':
            if( req.body.name == '' ){
                break;
            }
            Ingredient.findOneAndUpdate({_id: req.body.id}, {name: req.body.name},{}, function(err, ingredients){
                if( err ) return res.send('{}');
                return res.send('');
            });
            break;
        case 'amount':
            if( req.body.amount < 0 ){
                break;
            }
            Ingredient.findOneAndUpdate({_id: req.body.id}, {amount: req.body.amount},{}, function(err, ingredients){
                if( err ) return res.send('{}');
                return res.send('');
            });
            break;
        case 'price':
            Ingredient.findOneAndUpdate({_id: req.body.id}, {price: req.body.price},{}, function(err, ingredients){
                if( err ) return res.send('{}');
                return res.send('');
            });
            break;
        default:
            return res.send('{}');
    }
};

module.exports = routes;

