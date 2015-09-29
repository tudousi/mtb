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
                console.log('add classes error: ', err);
                return;
            }
            console.log(doc);
        });
    });
    app.get('/manage/classesAdd', function(req, res){
        res.render('manage/classesAdd', {});
    });
}
