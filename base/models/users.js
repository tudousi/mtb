var db = require('../db');
var util = require('../util');
var base = require('./base');

var User;
var UserSchema;
var UserModel;
module.exports = User = {};
/**
*   错误码：
*   -1 未找到用户
*/
UserSchema = new db.Schema({
    email:  {type: String, required: true},
    pass:   {type: String, required: true},
    nick:   {type: String, required: true},
    admin:  {type: String, default: ''},
    reg:    {type: Date, default: Date.now}
});
// 创建用户模型
db.mongoose.model('User', UserSchema);
// 添加用户模型
UserModel = db.mongoose.model('User');
// 将模型加入当前函数属性中
User.Model = UserModel;
// 继承基类的通用方法
util.mixin(User, base);
// 校验字段
UserModel.schema.path('email').validate(function (value) {
  return util.regexp.email.test(value);
}, 'Email地址无效');
UserModel.schema.path('nick').validate(function (value) {
  return value.length < 4 ? false : true;
}, '昵称不能小于4位');
UserModel.schema.path('nick').validate(function (value) {
  return value.length > 12 ? false : true;
}, '昵称不能大于12位');
