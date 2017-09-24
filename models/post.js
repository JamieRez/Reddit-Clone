var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var Comment = require('./comment');


var PostSchema = new Schema({
  title             : { type: String, required: true },
  summary         : { type: String, required: true },
  subreddit  : {type: String, required: true },
  url : String,
  comments  : [Comment.schema],
  author  :  String
});

module.exports = mongoose.model('Post', PostSchema);
