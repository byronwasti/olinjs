var home = function(req, res){
    date = new Date;
    var answer = "no";
    if (date.getMonth() == 11 && date.getDay() == 25){
        answer = "yes";
    }

    res.render('home', {"title": answer});
};

module.exports.home = home;
