var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = mongoose.Schema({
  name: String
});

var CommentSchema = mongoose.Schema({
  text: String,
  created_by: { type: Schema.Types.ObjectId, ref: 'User' }
});

var ItemSchema = mongoose.Schema({
   comments: [CommentSchema]
});

// Connect to DB and instantiate models
var db = mongoose.connect('mongodb://localhost/populate');
var User = db.model('User', UserSchema);
var Comment = db.model('Comment', CommentSchema);
var Item = db.model('Item', ItemSchema);

// Find and populate
Item.find({}).populate('comments.created_by').exec(function(err, items) {
    console.log(items[0].comments[0].created_by.name);
});
