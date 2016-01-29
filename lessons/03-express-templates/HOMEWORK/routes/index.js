var db = require('../fakeDatabase');

var NAMES = ['Tom', 'Jack', 'Andrew', 'Keenan', 'Patrick', 'Alex', 'Ian', 'Franton', 'John', 'Manik'];
var COLORS = ['yElLoW', 'YELLOW', 'green, jk, just yellow', 'yellow with a hint of lime', 'yellowish yellow', 'yellow of the sun', 'yellow', 'super yellow', 'REALLY yellow', 'More Yellow', 'Blue yellow'];

function Cat( name, age, color ){
    this.name = name;
    this.age = age;
    this.color = color;
};

function getRandomInt(min, max){
    return Math.floor(Math.random() * (max - min)) + min;
};

var home = function(req, res){
    res.render('home', {"do": [
        {link:"/cats/new"},
        {link:"/cats"},
        {link:"/cats/bycolor"},
        {link:"/cats/delete/old"}
    ]});
    //res.send("Welcome home!");
};

var catsNew = function(req, res){
    var cat = new Cat(NAMES[getRandomInt(0, NAMES.length)],
         getRandomInt(0, 23),
         COLORS[getRandomInt(0, COLORS.length)]);

    db.add(cat);
    res.render('display', {"cats": [
        cat
    ]});
};

var cats = function(req, res){
    var cats = db.getAll();//.sort(function(a,b){return a.age-b.age});
    
    res.render('display', {"cats":cats});
};

var catsColor = function(req, res){
    var cats = db.getAll().filter( function( cat ){
        return cat.color === req.params.color;
    });

    /*
    if( cats.length == 0 ){
        cats = db.getAll();
        var hash = {}
        for( var i=0; i < cats.length; i++){
            hash[cats[i].color] = 1;
        }
    }
    */

    res.render('display', {"cats": cats});
};

var deleteOldCat = function(req, res){
    var cats = db.getAll();//.sort(function(a,b){return a.age-b.age});

    console.log(cats[cats.length-1]);
    db.remove(cats.length);

    res.render('display', {"cats":[cats[cats.length-1]]});
};
//app.get('/cats/new', index.catsNew);
//app.get('/cats', index.cats);
//app.get('/cats/bycolor/:color', index.catsColor);
//app.get('/cats/delete/old', index.deleteOldCat);

module.exports.home = home;
module.exports.catsNew = catsNew;
module.exports.cats = cats;
module.exports.catsColor = catsColor;
module.exports.deleteOldCat = deleteOldCat;
