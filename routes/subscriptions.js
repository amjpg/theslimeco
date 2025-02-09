var express = require('express');
var router = express.Router();

// ==================================================
// Route to list all records. Display view to list all records
// ==================================================

router.get('/', function(req, res, next) {
let query = "SELECT subscriptionid, customerid, subscriptiontype, subscriptionstatus FROM subscriptions"; 

  // execute query
  db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        }
    res.render('subscriptions/allrecords', {allrecs: result });
    });
});

// ==================================================
// Route to view one specific record. Notice the view is one record
// URL: http://localhost:3025/subscriptions/3/show
// ==================================================
router.get('/:recordid/show', function(req, res, next) {
    let query = "SELECT subscriptionid, customerid, subscriptiontype, subscriptionstatus FROM subscriptions WHERE subscriptionid = " + req.params.recordid; 
    
    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.render('subscriptions/onerec', {onerec: result[0] });
        } 
    });
});

// ==================================================
// Route to show empty form to obtain input form end-user.
// URL: http://localhost:3025:/subscriptions/addrecord
// ==================================================
router.get('/addrecord', function(req, res, next) {
	res.render('subscriptions/addrec');
});


// ==================================================
// Route to obtain user input and save in database.
// ==================================================
router.post('/', function(req, res, next) {

    let insertquery = "INSERT INTO subscriptions (subscriptionid, customerid, subscriptiontype, subscriptionstatus, startdate, enddate) VALUES (?, ?, ?, ?, ?, ?)"; 
    
    db.query(insertquery,[req.body.subscriptionid, req.body.customerid, req.body.subscriptiontype, req.body.subscriptionstatus, req.body.startdate, req.body.enddate],(err, result) => {
        if (err) {
                console.log(err);
                res.render('error');
            } else {
                res.redirect('/subscriptions');
                }
            });
    });


// ==================================================
// Route to edit one specific record.
// URL: http://localhost:3025/subscriptions/3/edit
// NOTE: WHEN EDITING DATE, THE ORDER DATE MUST BE RETYPED TO NUMERIC. EXAMPLE: 2025-02-08.
// ==================================================
router.get('/:recordid/edit', function(req, res, next) {
    let query = "SELECT subscriptionid, customerid, subscriptiontype, startdate, enddate, subscriptionstatus FROM subscriptions WHERE subscriptionid = " + req.params.recordid;
    
      // execute query
      db.query(query, (err, result) => {
            if (err) {
                console.log(err);
                res.render('error');
            } else {
                res.render('subscriptions/editrec', {onerec: result[0] });
            } 
        });
    });
    

// ==================================================
// Route to save edited data in database.
// ==================================================
router.post('/save', function(req, res, next) {
	let updatequery = "UPDATE subscriptions SET customerid = ?, subscriptiontype = ?, startdate = ?, enddate = ?, subscriptionstatus = ? WHERE subscriptionid = " + req.body.subscriptionid; 

	db.query(updatequery,[req.body.customerid, req.body.subscriptiontype, req.body.startdate, req.body.enddate, req.body.subscriptionstatus],(err, result) => {
		if (err) {
			console.log(err);
			res.render('error');
		} else {
			res.redirect('/subscriptions');
		}
		});
    });


// ==================================================
// Route to delete one specific record.
// URL: http://localhost:3025/sales/3/delete
// ==================================================
router.get('/:recordid/delete', function(req, res, next) {
    let query = "DELETE FROM subscriptions WHERE subscriptionid = " + req.params.recordid;  
    
      // execute query
      db.query(query, (err, result) => {
            if (err) {
                console.log(err);
                res.render('error');
            } else {
                res.redirect('/subscriptions');
            } 
        });
    });
          
module.exports = router;