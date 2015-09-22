/**
* 需要注意的地方  ******【conditions】需严格按照数据库字段来，以对象的形式{key:'val'}*******
*/
var util = require('../util');
module.exports = {
    add: function(data, cb){
        var model = new this.Model(data);
        model.save(function(err){
            if(err){
                cb(err);
            }else{
                cb(null);
            }
        });
    },
    /*
    // mongoose 在执行update是无法调用验证器
    edit: function(conditions, data, cb){
        this.Model.update(conditions, {$set: data}, {runValidators: true}, function(err, res){
            if(err){
                cb(err);
            }else{
                cb(null, res['ok']);
            }
        })
    },
    */
    // 需要debuggr吧data放到res中
    edit: function(conditions, data, cb){
        this.findOne(conditions, function(err, res){
            if(err){
                cb(err);
            }else{
                debugger;
                util.mixin(res, data);
                res.save({runValidators: true}, function(err){
                    if(err){
                        console.log(err);
                    }
                });
            }
        })
    },
    findOne: function(conditions, cb){
        this.Model.findOne(conditions, function(err, res){
            if(err){
                cb(err);
            }else{
                cb(null, res);
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
