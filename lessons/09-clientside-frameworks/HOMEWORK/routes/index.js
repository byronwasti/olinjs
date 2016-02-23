var db = require('../db.js');
var Task = require('../models/taskModel.js');

module.exports = function(){
    return {
        home: function(req, res){
            res.render('home', {});
        },
        getTasks: function(req, res){
            Task.find({}).
                sort({time: -1}).
                exec(function(err, tasks){
                    res.json(tasks);
            });
        },
        postTasks: function(req, res){
            if(req.body.text == undefined){
                console.log("invalid response");
                return res.json({});
            }
            var task = new Task({
                text: req.body.text,
                time: Date.now(),
                completed: false
            })

            task.save(function(err, task){
                if (err) return res.json({});
                return res.json(task);
            });
        },
        removeTasks: function(req, res){
            Task.remove({_id: req.body._id})
                .exec(function(err, task){
                    return res.json({});
                });
        },
        completeTasks: function(req, res){
            console.log(req.body._id);
            Task.findOneAndUpdate({_id: req.body._id}, {completed: true})
                .exec(function(err, res){
                    if(err) console.error(err);
                    console.log("complete");
                });
            return res.json({});
        },
        editTasks: function(req, res){
            if( req.body.text == '' ){
                return res.json({err: 'invalid textbody'});
            }
            Task.findOneAndUpdate({_id: req.body._id}, {text:req.body.text})
                .exec(function(err, res){
                    if(err) console.error(err);
                });
            return res.json({});
        }
    }
}
