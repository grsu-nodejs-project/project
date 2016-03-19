var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/ab?cd', function(req, res) {
  res.send('ab?cd');
});

module.exports = router;
	