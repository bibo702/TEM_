var express = require('express');
var router = express.Router();
var middleware = require('../middleware');
var User = require('../models/user');

router.get('/user_profile_dashboard_settings', middleware.isLoggedIn, function(
  req,
  res
) {
  User.find({}, (err, allUsers) => {
    if (err) {
      console.log(err);
    } else {
      res.render('user_profile_dashboard_settings', {
        Users: allUsers,
        currentUser: req.user
      });
    }
  });

  //
});

module.exports = router;
