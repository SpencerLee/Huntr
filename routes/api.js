var express = require('express');
var router = express.Router();


/* GET users listing. */
router.get('/users', function(req, res, next) {
  res.send( {name: "Spencer", email: "spencerlee1990@gmail.com"});
});

module.exports = router;
