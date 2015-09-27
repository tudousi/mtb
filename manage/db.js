var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var config = require('./config');

mongoose.connect(config.db.uri, config.db.options);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  // yay!
});
module.exports = {
    Schema: Schema,
    db: db,
    mongoose: mongoose
};
