/**
manage routes
*/
var util = require('../util');
var users = require('../models/users');
var flash = require('flash');
var regExp = {

};
var flashInfo = {
    notUser: '未找到该用户',
    unknown: '未知错误，请联系管理员'
}

module.exports = function(app){
    app.get('/manage/login', function(req, res){
        res.render('manage/login');
    });
    app.post('/manage/login', function(req, res){
        //util.debugger('req.json', req);
        var email = req.body['email'];
        var pass = req.body['password'];
        var rem = req.body['rem'];
        users.findOne({email: email}, function(err, doc){
            if(err){
                // unknown error
                req.flash('loginInfo', flashInfo['unknown']);
                res.redirect('/manage/login');
                return;
            }
            if(!doc){
                // not found user
                req.flash('loginInfo', flashInfo['notUser']);
                res.redirect('/manage/login');
                return;
            }
            if(pass == util.sha1(doc['pass'])){
                // login success
                res.redirect('/manage/index');
                return;
            }
        });
    });
}
