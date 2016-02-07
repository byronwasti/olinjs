var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/burger');
var connection = mongoose.connection;

connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', function(){
});
