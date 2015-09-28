/**
manage routes
*/
//util.debugger('req.json', req);

var util = require('../util');
var users = require('../models/users');
var flash = require('flash');
var regExp = {

};
var flashInfo = {
    notUser: '账号或密码错误！',
    unknown: '未知错误，请联系管理员'
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
}
