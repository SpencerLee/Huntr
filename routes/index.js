var express = require('express');
var router = express.Router();
var passport = require('passport');
var GoogleStrategy      =   require('passport-google-oauth').OAuth2Strategy;
var configAuth          =   require('../config/auth');
var refresh = require('google-refresh-token');

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
  console.log(req);
  res.render('index', { user: req.user });
});

// AUTH
// =======================
router.get('/auth/google', passport.authenticate('google', { scope : [
  'profile', 
  'email',
  'https://www.googleapis.com/auth/gmail.readonly',
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile'],
  accessType: 'offline', approvalPrompt: 'force'}));
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

/**
 * get a new access token and expire time for that token given users refreshToken
 */
router.get('/googleToken' , function(req, res, next){
  var makeTokenRequest = new Promise(function(resolve, reject) {
    refresh(req.query.refreshToken, configAuth.googleAuth.clientID, configAuth.googleAuth.clientSecret, function (err, json, res) {
      if (err) return next(err);
      if (json.error) return next(new Error(res.statusCode + ': ' + json.error));

      var newAccessToken = json.accessToken;
      console.log(newAccessToken);
      if (!newAccessToken) {
        return next(new Error(res.statusCode + ': refreshToken error'));
      }
      var expireAt = +new Date + parseInt(json.expiresIn, 10);
      resolve({token: newAccessToken, expire: expireAt});
    });
  });
  makeTokenRequest.then(function(tokenInfo){
    res.send(tokenInfo);
  });
});

module.exports = router;
