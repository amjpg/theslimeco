var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let query = "SELECT productid, productname, prodimage, description, features, size, color, price, prodtype, dateadded FROM products WHERE homepage = true"; 

    // execute query
    db.query(query, (err, result) => {
      if (err) {
        console.log(err);
        res.render('error');
      }

    // res.render('index', { title: "The Slime Co.", allrecs: result });
      let query2 = "SELECT marketingpromoid, promoname, promoimage FROM marketing WHERE startdate <= CURRENT_DATE() and enddate >= CURRENT_DATE()"; 

		// execute query
 		  db.query(query2, (err, result2) => {
        if (err) {
          console.log(err);
          res.render('error');
        }
		  res.render('index', { title: "The Slime Co.", allrecs: result, promos: result2 });
		  });
	  });
});

module.exports = router;
