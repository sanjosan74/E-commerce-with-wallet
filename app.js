var createError = require('http-errors');
var express = require('express');
var path = require('path');
require('dotenv').config
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser= require('body-parser');
var stripe = require('stripe')(stripe_key)
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
var mainpageRouter = require('./routes/mainpage');
var lbbookRouter = require('./routes/lbbook');
var signupRouter = require('./routes/signup');
var paytRouter = require('./routes/admin');
//var addRouter = require('./routes/add');
var eventsRouter = require('./routes/events');
var questionsRouter = require('./routes/questions');
var buycryptoRouter = require('./routes/buycrypto');
var paytRouter = require('./routes/server');
//i got

// const ejs= require('ejs');

//l
var hbs=require('express-handlebars');
var app = express();
var fileUpload = require('express-fileupload');
var db = require('./config/connection')
var session=require('express-session')
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', hbs.engine({
  extname: 'hbs',
  defaultLayout: 'layout',
  layoutsDir: __dirname + '/views/layout/',
  partialsDir: __dirname + '/views/partials'
}))
//igot

// app.use(bodyParser.urlencoded({extended:true}));
// app.use(bodyParser.json()); 
//igot
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/static", express.static(path.join(__dirname, 'public')));
app.use(fileUpload());
//app.use(session({secret:"key",/*resave:true,saveUninitialized:true}));//*/cookie:{maxAge:600000}}))
app.use(session({
  secret:'thisismysecretdonttellanyone!',
  cookie:{
    sameSite: 'strict',
  }
}));
db.connect((err)=>{
  if(err) console.log("connection error");
  else console.log("database connected")
})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin',adminRouter);
app.use('/mainpage',mainpageRouter);
app.use('/mainpage/lbbook',lbbookRouter);
app.use('/signup',signupRouter);
app.use('/mainpage/events',eventsRouter);
app.use('/mainpage/questions',questionsRouter);
app.use('/mainpage/buycrypto',buycryptoRouter);
//app.use('/mainpage/lbbook/add',addRouter);
app.use('/paytm',paytRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
// app.use(bodyParser.json()); // to support JSON bodies
// app.use(bodyParser.urlencoded({ extended: true }));
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
