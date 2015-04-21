/**
 * Module dependencies.
 */

var bodyParser = require('body-parser');
var chalk = require('chalk');
var express = require('express');
var favicon = require('serve-favicon');
var logger = require('morgan');
var path = require('path');
var sass = require('node-sass-middleware');

var routes = require('./routes/index');
var users = require('./routes/users');

/**
 * Create an express application.
 */

var app = express();

/** 
 * App configuration.
 */ 

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

if (app.get('env') === 'development') {
  // don't minify html
  app.locals.pretty = true;

  // turn on console logging
  app.use(logger('dev'));

  // enable sass debugging
  app.set('sass debug', true);
}

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(sass({
  src: path.join(__dirname, 'sass'),
  dest: path.join(__dirname, 'public/css'),
  debug: true,
  prefix: '/css'
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

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

var server = app.listen(3000, function() {
  var env = '\n[' + chalk.green(app.get('env')) + ']';
  var port = chalk.magenta(server.address().port);
  console.log(env + ' Listening on port ' + port + '...\n');
});

module.exports = app;
