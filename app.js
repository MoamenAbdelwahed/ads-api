require('dotenv').config()
const cron = require('node-cron');
const nodemailer = require('nodemailer');
const db = require('./models/index');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var tagsRouter = require('./routes/tags');
var categoriesRouter = require('./routes/categories');
var adsRouter = require('./routes/ads');
var advertisersRouter = require('./routes/advertisers');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tags', tagsRouter);
app.use('/categories', categoriesRouter);
app.use('/ads', adsRouter);
app.use('/advertisers', advertisersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
  }
});

const users = db.User.findAll({
  include: [{
    model: db.Ad,
    where: {
      startDate: (new Date()).getDate()+1
    }
  }]
});
let reminderEmailCron = cron.schedule('0 20 * * *', () => {
  if (users.length > 0) {
    users.forEach((user) => {
      transporter.sendMail({
        from: process.env.EMAIL,
        to: user.email,
        subject: 'Reminder',
        text: 'Your add will start tomorrow'
      }, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      })
    })
  }
})
reminderEmailCron.start();

module.exports = app;
