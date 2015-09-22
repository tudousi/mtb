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
util.mixin(User, base)
/**
* 需要注意调用edit时，data只能传递修改的对象属性。 {email:'xxx@gmail.com'}
* res { ok: 1, nModified: 1, n: 1 }
*/
/*
User.add = function(data, cb){
    var user = new UserModel(data);
    user.save(function(err){
        if(err){
            cb(err);
        }else{
            cb(null);
        }
    });
}

User.edit = function(nick, data, cb){
    UserModel.update({nick: nick}, data, function(err, res){
        if(err){
            cb(err);
        }else{
            cb(null, res['ok']);
        }
    })
}
User.remove = function(nick, cb){
    UserModel.findOneAndRemove({nick: nick}, function(err){
        if(err){
            cb(err);
        }else{
            cb(null);
        }
    })
}
User.findByNick = function(nick, cb){
    UserModel.findOne({nick: nick}, function(err, user){
        if(err){
            cb(err);
        }else{
            cb(null, user);
        }
    });
}
*/
