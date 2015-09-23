var db = require('../db');
var util = require('../util');
var base = require('./base');

var Article;
var ArticleSchema;
var ArticleModel;
module.exports = Article = {};
/**
*
*/
ArticleSchema = new db.Schema({
    title:      {type: String, required: '文章标题不能为空'},
    alise:      {type: String},
    time:       {type: Date, defaults: Date.now},
    view:       {type: Number, defaults: 0},
    author:     {type: String},
    content:    {type: String},
    classes:    {type: db.Schema.Types.ObjectId, ref: 'Classes'},
    user:       {type: String, ref: 'User'}
});
// 创建用户模型
db.mongoose.model('Article', ArticleSchema);
// 添加用户模型
ArticleModel = db.mongoose.model('Article');
// 将模型加入当前函数属性中
Article.Model = ArticleModel;
// 继承基类的通用方法
util.mixin(Article, base);
// 校验字段
/*
ArticleModel.schema.path('name').validate(function (value) {
  return value.length < 2 ? false : true;
}, '分类名称不能小于2位');
*/

// 根据文章条件查询到文章关联的分类
Article.getArticleAndClasses = function(conditions, cb){
    this.Model.findOne({}).populate('classes user').exec(function(err, res){
        if(err){
            cb(err);
        }else{
            cb(null, res);
        }
    });
};









//
