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
app.post('/plus_ingredient', ingredients.plus);
app.post('/minus_ingredient', ingredients.minus);

app.post('/add_order', order.add);

app.post('/remove_order', kitchen.remove);
app.post('/complete_order', kitchen.complete);

app.listen(3000);
