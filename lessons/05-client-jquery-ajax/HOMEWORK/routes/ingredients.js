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
    // Ternary operator is a life-saver
    var ingdt = new Ingredient({name: req.body.name,
             amount: req.body.amount?req.body.amount:0,
             price: req.body.price?req.body.price:0});

    ingdt.save(function(err, ingdt){
        if(err) return console.error(err);
        res.send(ingdt);
    });

};

routes.remove = function(req, res){
    Ingredient.remove({_id: req.body.id}, function(err, ingredient){
        if( err ) return res.send('{}');
        if( ingredient.length == 0 ){
            return res.send('{}');
        }
        res.send(ingredient[0]);
    });
};

// There has to be a more compact way of doing this...
routes.edit = function(req, res){
    var error = false;
    switch(req.body.type){
        case 'name':
            if( req.body.name == '' ){
                error = true;
                break;
            }
            Ingredient.findOneAndUpdate({_id: req.body.id}, {name: req.body.name},{}, function(err, ingredients){
                if( err ) return res.send('{}');
                return res.send('');
            });
            break;
        case 'amount':
            if( req.body.amount < 0 || req.body.amount === ''){
                error = true;
                break;
            }
            Ingredient.findOneAndUpdate({_id: req.body.id}, {amount: req.body.amount},{}, function(err, ingredients){
                if( err ) return res.send('{}');
                return res.send('');
            });
            break;
        case 'price':
            if( req.body.price === null || req.body.price === '' ){
                error = true;
                break;
            }
            Ingredient.findOneAndUpdate({_id: req.body.id}, {price: req.body.price},{}, function(err, ingredients){
                if( err ) return res.send('{}');
                return res.send('');
            });
            break;
        default:
            return res.send('{}');
    }
    if( error ){
        return res.send('{}');
    }
};

module.exports = routes;

