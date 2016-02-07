var db = require('../db');
var Ingredient = require('../models/ingredientModel');
var Order = require('../models/orderModel');

var routes = {};

routes.home = function(req, res){
    var links = [{
        name: 'Ingredients', link: '/ingredients'
    },{
        name: 'Order', link: '/order'
    },{
        name: 'Kitchen', link: '/kitchen'
    }];
    res.render('home', {links: links});
    //res.send("Welcome home!");
};

module.exports = routes;
