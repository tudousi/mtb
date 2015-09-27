/**
manage routes
*/
module.exports = function(app){
    app.use('/manage/login', function(req, res){
        res.render('manage/login');
    });
}
