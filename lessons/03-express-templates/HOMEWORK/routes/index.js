var db = require('../fakeDatabase');

var NAMES = ['Tom', 'Jack', 'Andrew', 'Keenan', 'Patrick', 'Alex', 'Ian', 'Franton', 'John', 'Manik'];
var COLORS = ['yElLoW', 'YELLOW', 'green, jk, just yellow', 'yellow with a hint of lime', 'yellowish yellow', 'yellow of the sun', 'yellow', 'super yellow', 'REALLY yellow', 'fucking Yellow', 'really fucking yellow'];

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
    cats = db.getAll().sort(function(a,b){return a.age-b.age});
    
    res.render('display', {"cats":cats});
};

var catsColor = function(req, res){

};

var deleteOldCat = function(req, res){
    all_cats = db.getAll();
    cat = all_cats.reduce(function(prev, cur, idx, arr){
        if( cur.age > arr[prev].age ){
            return idx;
        }else{
            return prev;
        }
    });

    console.log(cat);
    db.remove(cat.idx);

    res.render('display', {"cats":[cat]});
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
