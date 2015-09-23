var db = require('../db');
var util = require('../util');
var base = require('./base');

var Classes;
var ClassesSchema;
var ClassesModel;
module.exports = Classes = {};
/**
*
*/
ClassesSchema = new db.Schema({
    name:  {type: String, required: '分类名称不能为空'},
    desc:   {type: String}
});
// 创建用户模型
db.mongoose.model('Classes', ClassesSchema);
// 添加用户模型
ClassesModel = db.mongoose.model('Classes');
// 将模型加入当前函数属性中
Classes.Model = ClassesModel;
// 继承基类的通用方法
util.mixin(Classes, base);
// 校验字段

ClassesModel.schema.path('name').validate(function (value) {
  return value.length < 2 ? false : true;
}, '分类名称不能小于2位');
ClassesModel.schema.path('name').validate(function (value) {
  return value.length > 16 ? false : true;
}, '分类名称不能大于16位');
ClassesModel.schema.path('name').validate(function (value) {
  return value == '' ? false : true;
}, '请填写分类名称');
