// init call
var util = require('./util');
var users = require('./models/users');
var classes = require('./models/classes');
var article = require('./models/article');


getArticleAndClasses();
function getArticleAndClasses(){
    article.getArticleAndClasses({title: 'article'}, function(err, article){
        if(err){
            console.log(err);
        }else{
            console.log(article);
        }
    });
}
function initArticle(id){
    var data = {
        title: 'article',
        alise: 'article alise new',
        classes: id,
        author: 'tudou',
        content: 'a something content article',
        user: 'tudou'
    };
    article.add(data, function(err){
        if(err){
            console.log(err);
        }else{
            console.log('初始化文章成功：' + data.title);
        }
    });
}


//initClasses(); // 初始化分类和文章
//editClasses();
function initClasses(){
    var data = {
        name: 'classes',
        desc: '分类描述'
    }
    classes.add(data, function(err, doc){
        if(err){
            console.log('初始化分类失败：' + err);
        }else{
            console.log('初始化分类成功：' + doc.name);
            initArticle(doc._id);
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
