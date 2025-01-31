var express = require('express');
var router = express.Router();

// URL: http://localhost:3025/privacy

router.get('/', function(req, res, next) {
    res.render('privacy');

});

module.exports = router;