var express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  flash = require('connect-flash'),
  passport = require('passport'),
  LocalStrategy = require('passport-local'),
  User = require('./models/user');

//---------------------------//require routes//---------------------------
var indexRoutes = require('./routes/index');
var succeslog = require('./routes/landing_page');
var user_profile_dashboard_settings = require('./routes/user_profile_dashboard_settings');
var search_mask_sentiment_analysis = require('./routes/search_mask_sentiment_analysis');
var Result_page_sentiment_analysis = require('./routes/Result_page_sentiment_analysis');

var url = process.env.DATABASE_URL || 'mongodb://localhost:27017/TEM_db';
mongoose
  .connect(url, { useNewUrlParser: true })
  .then(() => console.log('Connection Successful'))
  .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(flash());

//---------------------------//Passport Configuration//---------------------------
app.use(
  require('express-session')({
    secret: 'ThinkPad Lenovo',
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//---------------------------//Middlware function to request username automatically.//---------------------------
app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  res.locals.IBM_message = req.flash('IBM_message');
  // res.locals.previous_search= req

  next();
});

//---------------------------//Call the routes//---------------------------
app.use(indexRoutes);
app.use(succeslog);
app.use(user_profile_dashboard_settings);
// app.use(search_mask_sentiment_analysis);
app.use(Result_page_sentiment_analysis);

//---------------------------//Start Server//-----------------//
app.listen(3000, function() {
  console.log(' TEM Local server starting!');
});
