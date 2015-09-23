var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var config = require('./config');

mongoose.connect('localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    var UserSchema = new Schema({
        email:  {type: String},
        pass:   {type: String, required: true},
        nick:   {type: String, required: true}
    });
    mongoose.model('User', UserSchema);
    var UserModel = mongoose.model('User');
    var userEntity = new UserModel({
        email: 123,
        pass: 'pass',
        nick: 'nick'
    })
    userEntity.save(function(err){
        if(err){
            console.log(err);
        }

    })
});
