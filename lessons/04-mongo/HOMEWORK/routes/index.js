var db = require('../db')
var Cat = require('../models/catModel');

var NAMES = ['Tom', 'Jack', 'Andrew', 'Keenan', 'Patrick', 'Alex', 'Ian', 'Franton', 'John', 'Manik'];
var COLORS = ['yElLoW', 'YELLOW', 'green, jk, just yellow', 'yellow with a hint of lime', 'yellowish yellow', 'yellow of the sun', 'yellow', 'super yellow', 'REALLY yellow', 'More Yellow', 'Blue yellow'];

function getRandomInt(min, max){
    return Math.floor(Math.random() * (max - min)) + min;
};

var home = function(req, res){
    res.render('home', {"do": [
        {link:"/cats/new"},
        {link:"/cats"},
        {link:"/cats/bycolor"},
        {link:"/cats/delete/old"},
        {link:"/cats/oldPatrick"}
    ]});
    //res.send("Welcome home!");
};

var catsNew = function(req, res){
    var cat = new Cat({ name: NAMES[getRandomInt(0, NAMES.length)],
               color: COLORS[getRandomInt(0, COLORS.length)],
               age: getRandomInt(0, 23)
    });

    db.add(cat);

    res.render('display', {"cats": [
        cat
    ]});
};

var cats = function(req, res){
    //var cats = db.getAll(Cat);//.sort(function(a,b){return a.age-b.age});
    console.log(cats);

    Cat.find({})
       .sort({age: 1})
       .exec( function(err, cats){
        if (err) return console.error(err);
        res.render('display', {"cats":cats});
    });
    
};

var catsColor = function(req, res){
    Cat.find({color: req.params.color}, function(err, cats){
        res.render('display', {"cats": cats});
    })

};

var deleteOldCat = function(req, res){
    Cat.findOne({})
        .sort('-age')
        .exec(function(err, cat){
            console.log(cat);
            cat.remove(function(err, removed){
                res.render('display', {"cats": [cat]});
            });
    })
    //res.render('display', {"cats":});
};

var oldPatrick = function(req, res){
    Cat.find({ age: {$gt: 6}, name:'Patrick'}, function(err, cats){
        res.render('display', {"cats": cats});
    });
}

module.exports.home = home;
module.exports.catsNew = catsNew;
module.exports.cats = cats;
module.exports.catsColor = catsColor;
module.exports.deleteOldCat = deleteOldCat;
module.exports.oldPatrick = oldPatrick;
