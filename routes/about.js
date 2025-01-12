var express = require('express');
var router = express.Router();

/* GET about page. */
router.get('/', function(req, res, next) {
res.render('about', { title: 'About The Slime Co' });
});

module.exports = router;