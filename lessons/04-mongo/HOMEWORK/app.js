var express = require('express');
var exphbs = require('express-handlebars');
var index = require('./routes/index');
var db = require('./db');

var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', index.home);
app.get('/cats/new', index.catsNew);
app.get('/cats', index.cats);
app.get('/cats/bycolor/:color', index.catsColor);
app.get('/cats/delete/old', index.deleteOldCat);

app.listen(3000);
