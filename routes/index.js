var express = require('express');
var router = express.Router();
var passport = require('passport');
var GoogleStrategy      =   require('passport-google-oauth').OAuth2Strategy;

// HTML Endpoint
// =====================

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('login',{});
});

/* GET home page. */
router.get('/dashboard',isLoggedIn, function(req, res, next) {
  console.log("THis is the user");
  console.log(req.user);  

  res.render('index', { user: req.user });
});

// AUTH
// =======================
router.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
router.get('/auth/google/return*',
  passport.authenticate('google', { successRedirect: '/dashboard',
                                    failureRedirect: '/' }));

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

module.exports = router;
