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

    /*
        It looks like you're only sending the data which has changed -- ie only name if
        name has changed, and only price if price has changed.

        You could send all the data you need to fill the model -- that way req.body will be {id: __, name: __, price: __, amount: __}

        Then you can:

        Ingredient.findOneAndUpdate({_id: req.body.id}, req.body, {}, function (err, ingredients) {
            ...
        });

        ...which eliminates the need to switch on type (and the need to send type in the request body at all).

        I like that you're checking for invalid input, but I think that's better done on the clientside --
        you don't need to communicate with the server to perform any of those checks.
     */
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

