var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/login', function(req, res, next) {
  res.render('login',{});
});

/* GET home page. */
router.get('/:userId', function(req, res, next) {
  res.render('index', { userId: req.params.userId });
});

module.exports = router;
