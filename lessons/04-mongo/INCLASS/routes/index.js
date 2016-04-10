var home = function(req, res){
    res.render('home', {"classes": [
        {name:"Olin.js", teacher:"Me"},
        {name:"SigSys", teacher:"Oscar"},
        {name:"Discrete Mathematics", teacher:"Rihana"},
        {name:"UOCD", teacher:"No idea"}
    ]});
    //res.send("Welcome home!");
};

module.exports.home = home;
