var express = require('express');
var exphbs = require('express-handlebars');
var index = require('./routes/index');
var ingredients = require('./routes/ingredients');
var order = require('./routes/order');
var kitchen = require('./routes/kitchen');

var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var db = require('./db');


var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Set up GET requests
app.get('/', index.home);
app.get('/ingredients', ingredients.list);
app.get('/order', order.home);
app.get('/kitchen', kitchen.home);

// Set up POST requests
app.post('/add_ingredient', ingredients.add);
app.post('/remove_ingredient', ingredients.remove);
app.post('/edit_ingredient', ingredients.edit);
app.post('/add_order', order.add);
app.post('/remove_order', kitchen.remove);
//app.post('/complete_order', kitchen.complete); // Uncomment to have completion of orders
app.post('/complete_order', kitchen.remove);

app.listen(3000);
