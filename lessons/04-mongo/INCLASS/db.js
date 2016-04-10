var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
    console.log("Mongo is live!");
});

var robotSchema = mongoose.Schema({
    name: String,
    abilities: [String], 
    isEvil: Boolean,
}, {collection: 'users'});

var Robot = mongoose.model('Robot', robotSchema);

A = new Robot({name: 'JOB', abilities:['cock'], isEvil: true });
A.save(function(err, robot){
    if(err) return console.error(err);
});

Robot.find(function(err, robots){
    if(err) return console.error(err);
    console.log(robots);
});


