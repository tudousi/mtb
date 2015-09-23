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
    title:      {type: String},
    alise:      {type: String},
    classesId:  {type: db.Schema.Types.ObjectId},
    time:       {type: Date, defaults: Date.now},
    view:       {type: Number},
    author:     {type: String},
    content:    {type: String}
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

ArticleModel.schema.path('name').validate(function (value) {
  return value.length < 2 ? false : true;
}, '分类名称不能小于2位');
ArticleModel.schema.path('name').validate(function (value) {
  return value.length > 16 ? false : true;
}, '分类名称不能大于16位');
ArticleModel.schema.path('name').validate(function (value) {
  return value == '' ? false : true;
}, '请填写分类名称');
