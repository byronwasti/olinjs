var db = require('../db.js');
var User = require('../models/userModel.js');
var Twote = require('../models/twoteModel.js');

function hackerText( text ){
    text = text.toLowerCase();
    text = text.replace(/lol/g, '][_, ([]) ][_,');
    text = text.replace(/t/g, '7');
    text = text.replace(/e/g, '3');
    text = text.replace(/i/g, '1');
    text = text.replace(/a/g, '4');
    text = text.replace(/s/g, '5');
    text = text.replace(/o/g, '0');
    text = text.replace(/c/g, '(');
    text = text.replace(/l/g, '|');
    text = text.replace(/d/g, '|)');

    return text;
}

function unique(a) {
    var seen = {};
    return a.filter(function(item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
}

module.exports = function(){
    return {
        login: function(req, res){
            res.render('login',{});
        },
        home: function(req, res){
            Twote.find({})
                .populate('author')
                .sort({time: -1})
                .exec(function(err, twotes){

                    var users = twotes.map(function(twote){
						return twote.author;
					});
					users = unique(users);

                    console.log(req.user);

					if( req.user != undefined ){
						return res.render('home', {users: users, posts: twotes, name: '7w073r', user: req.user.name});
					}
					else {
						return res.render('home', {users: users, posts: twotes, name: '7w073r'});
					}

				});
		},

        logout: function(req, res){
            req.logout();
            res.redirect('/');
        },

        post: function(req, res){
            if( req.body.text == '' ){
                console.error("Invalid request");
                return res.send('{}');
            }
            console.log("POST: "+ req.user.name);
            var new_post = new Twote({
                author: req.user._id,
                text: hackerText(req.body.text),
                time: Date.now()
            });
            new_post.save();
            User.update({_id: req.user._id}, { $push: { post: new_post }});
            
            //new_post.author = req.user.displayName;
            res.send({post: new_post, author: req.user.name});
        },

        byUser: function(req, res){
            /*
            User.findOne({FB_ID: req.query.id})
               .populate('posts')
               .exec(function(err, user ){
                   var posts = user.posts.sort(function(a, b){
                        return a.time - b.time;
                   });

                   req.send(posts);
            });
            */
            Twote.find({author: req.query.id })
                .populate('author')
                .sort({time: -1})
                .exec(function(err, posts){
                    if( err ) console.error(err);

                    res.send(posts);
                });
        }
    }
}

