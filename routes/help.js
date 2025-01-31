var express = require('express');
var router = express.Router();

// URL: http://localhost:3025/help

router.get('/', function(req, res, next) {
    res.render('help');

});

module.exports = router;