/**
manage routes
*/
//util.debugger('req.json', req);

var util = require('../util');
var users = require('../models/users');
var classes = require('../models/classes');
var flash = require('flash');
var regExp = {

};
var flashInfo = {
    notUser: '账号或密码错误！',
    unknown: '未知错误，请联系管理员',
    error: '操作失败',
    success: '操作成功'
}

module.exports = function(app){
    app.get('/manage/login', function(req, res){
        var error_messages = req.flash('error_messages');
        res.render('manage/login', {error_messages: error_messages});
    });
    app.post('/manage/login', function(req, res){
        var email = req.body['email'];
        var pass = req.body['password'];
        var rem = req.body['rem'];
        users.findOne({email: email}, function(err, doc){
            if(err){
                // unknown error
                req.flash('error_messages', flashInfo['unknown']);
                res.redirect('/manage/login');
                return;
            }
            if(!doc){
                // not found user
                req.flash('error_messages', flashInfo['notUser']);
                res.redirect('/manage/login');
                return;
            }
            if(util.sha1(pass) == doc['pass']){
                // login success
                req.session.loginInfo = {user: doc};
                res.redirect('/manage/index');
                return;
            }else{
                // password error
                req.flash('error_messages', flashInfo['notUser']);
                res.redirect('/manage/login');
                return;
            }
        });
    });
    //
    app.get('/manage/index', function(req, res){
        res.render('manage/index', {});
    });

    app.get('/manage/classes', function(req, res){
        classes.Model.find({}, function(err, doc){
            if(err){
                console.log(err);
            }
            console.log(doc);
        });
        res.render('manage/classes', {});
    });
    // add classes
    app.post('/manage/classes', function(req, res){
        var parent = req.body['parent'] || null;
        var name = req.body['name'];
        var desc = req.body['desc'];
        classes.add({
            parent: parent,
            name: name,
            desc: desc
        }, function(err, doc){
            if(err){
                req.flash('error_messages', flashInfo['error']);
                res.redirect('/manage/classes');
                return;
            }
            req.flash('success_messages', flashInfo['success']);
            res.redirect('/manage/classes');
        });
    });
    app.get('/manage/classesAdd', function(req, res){
        // 获取已有的分类
        classes.Model.find({}).sort({parent: 'asc', }).exec(function(err, doc){
            var docObject = {};
            // 遍历返回数据
            doc.forEach(function(item){
                // 如果是顶级类直接加到数据中
                // 有坑，默认的item是无法增加对象属性的，要重新创建对象
                var item = {
                    _id: item._id,
                    parent: item.parent,
                    name: item.name,
                    desc: item.desc,
                    children: ''
                };
                // 就是顶级分类直接添加到docObject中
                if(!item['parent']){
                    docObject[item['_id']] = item;
                }else{
                    // 遍历已有的数据找到父级分类
                    var parentObj = getParent(docObject, item['parent']);
                    // 将当前分类添加到找到的父分类中
                    if(parentObj){
                        parentObj['children'] = {};
                        parentObj['children'][item['_id']] = item;
                    }
                }
            });
            // 遍历字符串树
            // [{name:'',_id:''}]
            var treeStr = [];
            function getTree(obj, str){
                var tmpObj = null;
                if(!str) str = '|-';
                for(var key in obj){
                    tmpObj = obj[key];
                    //console.log(tmpObj);
                    if(tmpObj['parent']){
                        str += '|-';
                    }
                    treeStr.push({name: str + tmpObj['name'], _id: tmpObj['_id']});
                    if(tmpObj['children']){
                        getTree(tmpObj['children'], str);
                    }
                }
            }
            getTree(docObject);
            // 找到父级分类并返回父级
            function getParent(obj, parentId){
                for(var key in obj){
                    var cObj = obj[key];
                    // 如果在顶级就能找到就直接返回
                    if(key == parentId){
                        return cObj;
                    }
                    // 如果有子分类就继续找
                    if(cObj['children']){
                        getParent(cObj[key]['children'], parentId);
                    }
                }
                return;
            }
            // 需要遍历对象构建html
            //console.log(treeStr);
            res.render('manage/classesAdd', {classes: treeStr});
        });
    });
}
