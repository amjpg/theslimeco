var express = require('express');
var router = express.Router();

// ==================================================
// Route to list all records. Display view to list all records
// ==================================================

router.get('/', function(req, res, next) {
let query = "SELECT saleorderid, customerid, totalAmt, orderstatus FROM sales"; 

  // execute query
  db.query(query, (err, result) => {
		if (err) {
			console.log(err);
			res.render('error');
		}
	res.render('sales/allrecords', {allrecs: result });
 	});
});

// ==================================================
// Route to view one specific record. Notice the view is one record
// URL: http://localhost:3025/sales/3/show
// ==================================================
router.get('/:recordid/show', function(req, res, next) {
    let query = "SELECT saleorderid, customerid, totalAmt, orderstatus FROM sales WHERE saleorderid = " + req.params.recordid; 
    
    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.render('sales/onerec', {onerec: result[0] });
        } 
    });
});

// ==================================================
// Route to show empty form to obtain input form end-user.
// URL: http://localhost:3025:/sales/addrecord
// ==================================================
router.get('/addrecord', function(req, res, next) {
	res.render('sales/addrec');
});


// ==================================================
// Route to obtain user input and save in database.
// ==================================================
router.post('/', function(req, res, next) {

    let insertquery = "INSERT INTO sales (customerid, orderdate, discount, paymentmethod, totalAmt, shippingaddress, orderstatus) VALUES (?, ?, ?, ?, ?, ?, ?)"; 
    
    db.query(insertquery,[req.body.customerid, req.body.orderdate, req.body.discount, req.body.paymentmethod, req.body.totalAmt, req.body.shippingaddress, req.body.orderstatus],(err, result) => {
        if (err) {
                console.log(err);
                res.render('error');
            } else {
                res.redirect('/sales');
                }
            });
    });

// ==================================================
// Route to edit one specific record.
// URL: http://localhost:3025/sales/3/edit
// NOTE: WHEN EDITING DATE, THE ORDER DATE MUST BE RETYPED TO NUMERIC. EXAMPLE: 2025-02-08.
// ==================================================
router.get('/:recordid/edit', function(req, res, next) {
    let query = "SELECT saleorderid, customerid, orderdate, discount, paymentmethod, totalAmt, shippingaddress, orderstatus FROM sales WHERE saleorderid = " + req.params.recordid;
    
      // execute query
      db.query(query, (err, result) => {
            if (err) {
                console.log(err);
                res.render('error');
            } else {
                res.render('sales/editrec', {onerec: result[0] });
            } 
        });
    });


// ==================================================
// Route to save edited data in database.
// NOTE: WHEN EDITING DATE, THE ORDER DATE MUST BE RETYPED TO NUMERIC. EXAMPLE: 2025-02-08.
// ==================================================
router.post('/save', function(req, res, next) {
	let updatequery = "UPDATE sales SET customerid = ?, orderdate = ?, discount = ?, paymentmethod = ?, totalAmt = ?, shippingaddress = ?, orderstatus = ? WHERE saleorderid = " + req.body.saleorderid; 

	db.query(updatequery,[req.body.customerid, req.body.orderdate, req.body.discount, req.body.paymentmethod, req.body.totalAmt, req.body.shippingaddress, req.body.orderstatus],(err, result) => {
		if (err) {
			console.log(err);
			res.render('error');
		} else {
			res.redirect('/sales');
		}
		});
    });


// ==================================================
// Route to delete one specific record.
// URL: http://localhost:3025/sales/3/delete
// ==================================================
router.get('/:recordid/delete', function(req, res, next) {
    let query = "DELETE FROM sales WHERE saleorderid = " + req.params.recordid;  
    
      // execute query
      db.query(query, (err, result) => {
            if (err) {
                console.log(err);
                res.render('error');
            } else {
                res.redirect('/sales');
            } 
        });
    });
          

module.exports = router;
