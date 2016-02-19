var express = require('express');
var exphbs = require('express-handlebars');
var session = require('express-session');

var index = require('./routes/index')();
var db = require('./db.js');
var User = require('./models/userModel.js');

var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var LocalStrategy = require('passport-local').Strategy;
var auth = require('./auth');

passport.use(new FacebookStrategy({
    clientID: auth.FACEBOOK_APP_ID,
    clientSecret: auth.FACEBOOK_APP_SECRET,
    callbackURL: auth.FACEBOOK_CALLBACK_URL
  },
  function(accessToken, refreshToken, profile, done) {
    //This is not what you want to do here. 
    //Here you should search the connected DB if the user exists and load that in, or add it to db.
    console.log("FB Strat" + profile);
    User.findOne({FB_ID: profile.id}, function(err, user){
        if( user === null ){
            new_user = new User({ FB_ID: profile.id, name: profile.displayName });
            new_user.save();
            return done(null, new_user);
        }
        else {
            return done(null, user);
        }
    
    });
    //done(null, profile);
  }
));


var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(session({
  secret: 'superS3CRE7',
  resave: false,
  saveUninitialized: false ,
  cookie: {}
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.get('/', index.home);

app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/' }),
    function(req, res){
        console.log("success!");
        res.redirect('/');
    });

app.get('/logout', index.logout);
app.get('/byUser', index.byUser);
app.post('/twote', ensureAuthenticated, index.post);

app.listen(3000);

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
    res.send(401);
}

module.exports = app;
