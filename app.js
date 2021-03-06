var express =           require('express');
var path =              require('path');
var favicon =           require('serve-favicon');
var logger =            require('morgan');
var cookieParser =      require('cookie-parser');
var bodyParser =        require('body-parser');
var mongoose        =   require('mongoose');
var cors =              require('cors')
var index =             require('./routes/index');
var api =               require('./routes/api');
var PassportConfig =    require('./config/passport');
var passport =          require('passport');
var session =           require('express-session');
var app = express();

PassportConfig.setup();

// setting up database connection

var dbUri = 'mongodb://huntrapp:nwhacks2016@ds019048.mlab.com:19048/heroku_jb1kv7vt';
var dbLocal = 'mongodb://localhost/huntrDB';


if(process.env.NODE_ENV == "production"){
  mongoose.connect(dbUri);
  console.log("environment is production");
}
else{
  mongoose.connect(dbLocal);
  console.log("environment is not production");
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));

app.use(session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());

app.use(cors({credentials: false, origin: true}));

app.use('/api', api);
app.use('/', index);

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
  console.log(err)
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
