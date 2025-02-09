var express = require('express');
var router = express.Router();

// ==================================================
// Route to list all records. Display view to list all records
// ==================================================

router.get('/', function(req, res, next) {
let query = "SELECT orderdetailsid, saleorderid, productid, quantity, subtotal FROM orderdetails"; 

  // execute query
  db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        }
    res.render('orderdetails/allrecords', {allrecs: result });
    });
});

// ==================================================
// Route to view one specific record. Notice the view is one record
// URL: http://localhost:3025/orderdetails/3/show
// ==================================================
router.get('/:recordid/show', function(req, res, next) {
    let query = "SELECT orderdetailsid, saleorderid, productid, quantity, subtotal FROM orderdetails WHERE orderdetailsid = " + req.params.recordid; 
    
    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.render('orderdetails/onerec', {onerec: result[0] });
        } 
    });
});

// ==================================================
// Route to show empty form to obtain input form end-user.
// URL: http://localhost:3025:/orderdetails/addrecord
// ==================================================
router.get('/addrecord', function(req, res, next) {
	res.render('orderdetails/addrec');
});


// ==================================================
// Route to obtain user input and save in database.
// ==================================================
router.post('/', function(req, res, next) {

    let insertquery = "INSERT INTO orderdetails (saleorderid, productid, quantity, unitprice, subtotal) VALUES (?, ?, ?, ?, ?)"; 
    
    db.query(insertquery,[req.body.saleorderid, req.body.productid, req.body.quantity, req.body.unitprice, req.body.subtotal],(err, result) => {
        if (err) {
                console.log(err);
                res.render('error');
            } else {
                res.redirect('/orderdetails');
                }
            });
    });

// ==================================================
// Route to edit one specific record.
// URL: http://localhost:3025/orderdetails/3/edit
// NOTE: WHEN EDITING DATE, THE ORDER DATE MUST BE RETYPED TO NUMERIC. EXAMPLE: 2025-02-08.
// ==================================================
router.get('/:recordid/edit', function(req, res, next) {
    let query = "SELECT orderdetailsid, saleorderid, productid, quantity, unitprice, subtotal FROM orderdetails WHERE orderdetailsid = " + req.params.recordid;
    
      // execute query
      db.query(query, (err, result) => {
            if (err) {
                console.log(err);
                res.render('error');
            } else {
                res.render('orderdetails/editrec', {onerec: result[0] });
            } 
        });
    });


// ==================================================
// Route to save edited data in database.
// ==================================================
router.post('/save', function(req, res, next) {
	let updatequery = "UPDATE orderdetails SET saleorderid = ?, productid = ?, quantity = ?, unitprice = ?, subtotal = ? WHERE orderdetailsid = " + req.body.orderdetailsid; 

	db.query(updatequery,[req.body.saleorderid, req.body.productid, req.body.quantity, req.body.unitprice, req.body.subtotal],(err, result) => {
		if (err) {
			console.log(err);
			res.render('error');
		} else {
			res.redirect('/orderdetails');
		}
		});
    });


// ==================================================
// Route to delete one specific record.
// URL: http://localhost:3025/orderdetails/3/delete
// ==================================================
router.get('/:recordid/delete', function(req, res, next) {
    let query = "DELETE FROM orderdetails WHERE orderdetailsid = " + req.params.recordid;  
    
      // execute query
      db.query(query, (err, result) => {
            if (err) {
                console.log(err);
                res.render('error');
            } else {
                res.redirect('/orderdetails');
            } 
        });
    });
          

module.exports = router;