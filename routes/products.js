var express = require('express');
var router = express.Router();

// ==================================================
// Route to list all records. Display view to list all records
// URL: http://localhost:3025/products/
// ==================================================

router.get('/', function(req, res, next) {
let query = "SELECT productid, productname, description, price, features, color, homepage FROM products"; 

  // execute query
  db.query(query, (err, result) => {
		if (err) {
			console.log(err);
			res.render('error');
		}
	res.render('products/allrecords', {allrecs: result });
 	});
});


// ==================================================
// Route to view one specific record. Notice the view is one record
// URL: http://localhost:3025/products/3/show
// ==================================================
router.get('/:recordid/show', function(req, res, next) {
    let query = "SELECT productid, productname, description, price, features, color, homepage FROM products WHERE productid = " + req.params.recordid; 
    
    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.render('products/onerec', {onerec: result[0] });
        } 
    });
});
    

// ==================================================
// Route to show empty form to obtain input form end-user.
// URL: http://localhost:3025:/products/addrecord
// ==================================================
router.get('/addrecord', function(req, res, next) {
	res.render('products/addrec');
});


// ==================================================
// Route to obtain user input and save in database.
// ==================================================
router.post('/', function(req, res, next) {

    let insertquery = "INSERT INTO products (productname, prodimage, description, features, size, color, price, prodtype, dateadded, homepage) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"; 
    
    var homepage_value=0;
    if (req.body.homepage)
        {
            homepage_value = 1;
        }

    db.query(insertquery,[req.body.productname, req.body.prodimage, req.body.description, req.body.features, req.body.size, req.body.color, req.body.price, req.body.prodtype, req.body.dateadded, homepage_value],(err, result) => {
        if (err) {
                console.log(err);
                res.render('error');
            } else {
                res.redirect('/products');
                }
            });
    });

// ==================================================
// Route to edit one specific record.
// URL: http://localhost:3025/product/3/edit
// ==================================================
router.get('/:recordid/edit', function(req, res, next) {
    let query = "SELECT productid, productname, description, price, features, color, size, prodtype, prodimage, homepage FROM products WHERE productid = " + req.params.recordid;
    
      // execute query
      db.query(query, (err, result) => {
            if (err) {
                console.log(err);
                res.render('error');
            } else {
                res.render('products/editrec', {onerec: result[0] });
            } 
        });
});


// ==================================================
// Route to save edited data in database.
// ==================================================
router.post('/save', function(req, res, next) {
	let updatequery = "UPDATE products SET productname = ?, prodimage = ?, description = ?, features = ?, color = ?, size = ?, prodtype = ?, prodimage = ?, homepage = ? WHERE productid = " + req.body.productid; 

    var homepage_value=0;
    if (req.body.homepage)
        {
            homepage_value = 1;
        }
        

	db.query(updatequery,[req.body.productname, req.body.prodimage, req.body.description, req.body.features, req.body.color, req.body.size, req.body.prodtype, req.body.prodimage, homepage_value],(err, result) => {
		if (err) {
			console.log(err);
			res.render('error');
		} else {
			res.redirect('/products');
		}
		});
});

// ==================================================
// Route to delete one specific record.
// URL: http://localhost:3025/products/3/delete
// ==================================================
router.get('/:recordid/delete', function(req, res, next) {
    let query = "DELETE FROM products WHERE productid = " + req.params.recordid;  
    
      // execute query
      db.query(query, (err, result) => {
            if (err) {
                console.log(err);
                res.render('error');
            } else {
                res.redirect('/products');
            } 
        });
    });
                                                                          

module.exports = router;


