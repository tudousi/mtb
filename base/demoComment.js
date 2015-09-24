var mongoose = require('mongoose')
  , Schema = mongoose.Schema


var ArticleSchema = Schema({
    title: String
})
var AuthorSchema = Schema({
    name    : String
});
var CommentSchema = Schema({
    discussion_id: {tpye: Schema.Types.ObjectId, ref: 'Article'},       // parent comment
    slug: String,
    posted: {type: Date, defaults: Date.now},
    author: {type: Schema.Types.ObjectId, ref: 'Author'},
    text: String
});



mongoose.connect('mongodb://localhost/comment', function (err){
    if (err) throw err;






});
