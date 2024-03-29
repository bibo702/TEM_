var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');

router.get('/', function(req, res) {
  res.render('landing_page', { currentUser: req.user });
});
router.get('/landing_cases', function(req, res) {
  res.render('landing_cases', { currentUser: req.user });
});
//==================== //----------AUTH ROUTES-------------//====================

//Get request to show register form
router.get('/register', function(req, res) {
  res.render('register');
});

// Post request  to handle sign up logic
router.post('/register', function(req, res) {
  //This is the username from the register form
  var newUser = new User({ username: req.body.username });

  User.register(newUser, req.body.password, function(err, user) {
    if (err) {
      console.log(err.message);

      req.flash('error', err.message);
      return res.render('register');
    }
    passport.authenticate('local')(req, res, function() {
      req.flash('success', 'Welcome to TEM TOOL ', user.username);
      res.redirect('landing_page');
    });
  });
});

// show login from
router.get('/login', function(req, res) {
  res.render('login');
});

// handeling login logic
//---app.post("/login", MIDDELWARE, CallBack Function)
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/landing_page',
    failureRedirect: '/login'
  }),
  function(req, res) {}
);

//logout route
router.get('/logout', function(req, res) {
  //comes from the installed packages
  req.flash('success', ' you are logged out');
  req.logout();
  res.redirect('/');
});

module.exports = router;
