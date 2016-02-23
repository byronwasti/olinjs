var mongoose = require('mongoose');

module.exports = mongoose.model('user', mongoose.Schema({
    tasks : [{type: mongoose.Schema.Types.ObjectId, ref:'task'}]
}));
