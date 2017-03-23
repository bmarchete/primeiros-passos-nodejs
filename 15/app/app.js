var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var methodOverride = require('method-override');

require('./passport');

var expressNunjucks = require('express-nunjucks');

var register = require('./routes/register');
var tasks = require('./routes/tasks');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'njk');
var njk = expressNunjucks(app,{watch:true, noCache: true});

app.use(session({
  secret: 'teste sessoes',
  resave: false,
  saveUninitialized: false,

}));

app.use(passport.initialize());
app.use(passport.session());


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {

    var method = req.body._method
    delete req.body._method
    return method
  }
}));

app.use('/', register);
app.use('/', tasks);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
