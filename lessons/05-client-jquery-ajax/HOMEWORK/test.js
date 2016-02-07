var mongoose = require('mongoose')
  , Schema = mongoose.Schema
mongoose.connect('mongodb://localhost/test');

var connection = mongoose.connection;
var personSchema = Schema({
  name    : String,
  age     : Number,
  stories : [{ type: Schema.Types.ObjectId, ref: 'Story' }]
});

var storySchema = Schema({
  _creator : { type: Schema.Types.ObjectId, ref: 'Person' },
  title    : String,
  fans     : [{ type: Number, ref: 'Person' }]
});

var Story  = mongoose.model('Story', storySchema);
var Person = mongoose.model('Person', personSchema);

function handleError(err){
    console.log(err);
};

connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', function(){
    /**
    var aaron = new Person({ name: 'Jet', age: 100 });
    aaron.save(function (err) {
      if (err) return handleError(err);
      
      var story1 = new Story({
        title: "Fuck",
        _creator: aaron._id    // assign the _id from the person
      });
      
      story1.save(function (err) {
        if (err) return handleError(err);
        // thats it!
      });
    });

    /*/
    Story
    .findOne({ title: 'Fuck' })
    .populate('_creator')
    .exec(function (err, story) {
      if (err) return handleError(err);
      console.log(story);
      //console.log('The creator is %s', story._creator.name);
      // prints "The creator is Aaron"
    });
    //*/
});
  

/*
*/

