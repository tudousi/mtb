var db = require('../db');

var UserSchema = new db.Schema({
    user: String,
    pass: String,
    nick: String,
    reg: {type: Date, default: Date.now}

});
