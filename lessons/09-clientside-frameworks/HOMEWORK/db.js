var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/todo');
var connection = mongoose.connection;

connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', function(){
    console.log('Mongodb Connection Successful');
});
