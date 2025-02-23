var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {

	let query = "SELECT productid, productname, prodimage, description, features, size, color, price, prodtype, dateadded FROM products WHERE description LIKE '%" + req.query.searchcriteria 
    + "%' OR productname LIKE '%" + req.query.searchcriteria + "%'";   

	// execute query
	db.query(query, (err, result) => {
		if (err) {
			console.log(err);
			res.render('error');
		} else {
			res.render('search', {allrecs: result});
		} 
	});
});

module.exports = router;
