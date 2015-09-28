/**
* 需要注意的地方  ******【conditions】需严格按照数据库字段来，以对象的形式{key:'val'}*******
*/
var util = require('../util');
module.exports = {
    add: function(data, cb){
        var model = new this.Model(data);
        model.save(function(err, doc){
            if(err){
                cb(err);
            }else{
                cb(null, doc);
            }
        });
    },
    // mongoose 在执行update是无法调用验证器
    // http://stackoverflow.com/questions/15627967/why-mongoose-doesnt-validate-on-update
    // https://www.mongodb.com/blog/post/introducing-version-40-mongoose-nodejs-odm
    // 验证是否不验证数据类型
    edit: function(conditions, data, cb){
        this.Model.update(conditions, data, {runValidators: true}, function(err, doc){
            if(err){
                cb(err);
            }else{
                cb(null, doc['ok']);
            }
        })
    },
    findOne: function(conditions, cb){
        this.Model.findOne(conditions, function(err, doc){
            if(err){
                cb(err);
            }else{
                cb(null, doc);
            }
        });
    },
    remove: function(conditions, cb){
        this.Model.findOneAndRemove(conditions, function(err){
            if(err){
                cb(err);
            }else{
                cb(null);
            }
        })
    }
}
