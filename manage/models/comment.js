var db = require('../db');
var util = require('../util');
var base = require('./base');

var Comment;
var CommentSchema;
var CommentModel;
module.exports = Comment = {};
/**
*
*/
CommentSchema = new db.Schema({
    title:      {type: String, required: ''},
    content:    {type: String, required: ''},
    date:       {type: Date, defaults: Date.now},
    user:       {type: db.Schema.Types.ObjectId, ref: 'User'}
});
// 创建用户模型
db.mongoose.model('Comment', CommentSchema);
// 添加用户模型
CommentModel = db.mongoose.model('Comment');
// 将模型加入当前函数属性中
Comment.Model = CommentModel;
// 继承基类的通用方法
util.mixin(Comment, base);
// 校验字段
/*
ArticleModel.schema.path('name').validate(function (value) {
  return value.length < 2 ? false : true;
}, '分类名称不能小于2位');
*/

// 根据文章条件查询到文章关联的分类
/*
Article.getArticleAndClasses = function(conditions, cb){
    this.Model.findOne({}).populate('classes user').exec(function(err, res){
        if(err){
            cb(err);
        }else{
            cb(null, res);
        }
    });
};
*/








//
