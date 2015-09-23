// init call
var util = require('./util');
var users = require('./models/users');
var classes = require('./models/classes');
var article = require('./models/article');


function initArticle(){
    var data = {
        title: 'news',
        alise: 'news alise',
        classesId: ''
    };
}


//initClasses();
//editClasses();
function initClasses(){
    var data = {
        name: 'news',
        desc: 'Daily News'
    }
    classes.add(data, function(err){
        if(err){
            console.log('初始化分类失败：' + err);
        }else{
            console.log('初始化分类成功：' + data.name);
        }
    });
}
function editClasses(){
    classes.edit({name: 'news2'}, {name: ''}, function(err){
        if(err){
            console.log(err.errors);
            console.log('修改分类描述失败：' + err);
        }else{
            console.log('修改分类描述成功！');
        }
    });
}


//inintUser();
//searchUser();
//editUser();

function inintUser(){
    // test user
    var user = {
        email: '41871879@qq.com',
        pass: util.sha1('123456'),
        nick: 'tudou',
        admin: 'Y'
    };
    users.add(user, function(err){
        if(err){
            console.log('调用添加用户错误：' + err);
        }else{
            console.log('初始化 ' + user.nick + ' 成功！');
        }

    });

}
// 查找用户
function searchUser(){
    users.findOne({nick: 'tudou'}, function(err, user){
        if(err){
            console.log('调用查找用户失败！');
        }else{
            console.log(user);
        }
    });
}
// 修改用户
function editUser(){
    users.edit({nick: 'tudou'}, {nick: '1234567890123'}, function(err){
        if(err){
            console.log(err.errors);
            console.log('修改用户邮箱失败：' + err);
        }else{
            console.log('修改邮箱成功！');
        }
    });
}



// 删除用户
function deleteUser(){
    users.remove('tudousi', function(err, user){
        if(err){
            console.log('删除用户失败：' + err);
        }else{
            console.log(user);
        }
    });
}








































//
