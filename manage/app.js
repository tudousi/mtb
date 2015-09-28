var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash = require('flash');
var db = require('./db');

// https://github.com/kcbanner/connect-mongo
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

//var routes = require('./routes/index');
//var users = require('./routes/users');
var manage = require('./routes/manage');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



// 使用mongoose重置连接
app.use(session({
    secret: 'mtb-session-opopop',
    store: new MongoStore({
        mongooseConnection: db.db,
        ttl: 15 * 24 * 60 * 60 // = 15 days. Default
    })
}));
// flash
app.use(flash());

//app.use('/', routes);
//app.use('/users', users);
manage(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
