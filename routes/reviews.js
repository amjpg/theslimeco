var express = require('express');
var router = express.Router();

// ==================================================
// Route to list all records. Display view to list all records
// ==================================================

router.get('/', function(req, res, next) {
let query = "SELECT reviewid, productid, customerid, reviewdate, comments, rating FROM reviews"; 

  // execute query
  db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        }
    res.render('reviews/allrecords', {allrecs: result });
    });
});

// ==================================================
// Route to view one specific record. Notice the view is one record
// URL: http://localhost:3025/reviews/3/show
// ==================================================
router.get('/:recordid/show', function(req, res, next) {
    let query = "SELECT reviewid, productid, customerid, reviewdate, comments, rating FROM reviews WHERE reviewid = " + req.params.recordid; 
    
    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.render('reviews/onerec', {onerec: result[0] });
        } 
    });
});

// ==================================================
// Route to show empty form to obtain input form end-user.
// URL: http://localhost:3025:/reviews/addrecord
// ==================================================
router.get('/addrecord', function(req, res, next) {
	res.render('reviews/addrec');
});

// ==================================================
// Route to obtain user input and save in database.
// ==================================================
router.post('/', function(req, res, next) {

    let insertquery = "INSERT INTO reviews (reviewid, productid, customerid, reviewdate, comments, rating, publishedstatus) VALUES (?, ?, ?, ?, ?, ?, ?)"; 
    
    db.query(insertquery,[req.body.reviewid, req.body.productid, req.body.customerid, req.body.reviewdate, req.body.comments, req.body.rating, req.body.publishedstatus],(err, result) => {
        if (err) {
                console.log(err);
                res.render('error');
            } else {
                res.redirect('/reviews');
                }
            });
    });

// ==================================================
// Route to edit one specific record.
// URL: http://localhost:3025/reviews/3/edit
// NOTE: WHEN EDITING DATE, THE ORDER DATE MUST BE RETYPED TO NUMERIC. EXAMPLE: 2025-02-08.
// ==================================================
router.get('/:recordid/edit', function(req, res, next) {
    let query = "SELECT reviewid, productid, customerid, reviewdate, comments, rating, publishedstatus FROM reviews WHERE reviewid = " + req.params.recordid;
    
      // execute query
      db.query(query, (err, result) => {
            if (err) {
                console.log(err);
                res.render('error');
            } else {
                res.render('reviews/editrec', {onerec: result[0] });
            } 
        });
    });


// ==================================================
// Route to save edited data in database.
// ==================================================
router.post('/save', function(req, res, next) {
	let updatequery = "UPDATE reviews SET productid = ?, customerid = ?, reviewdate = ?, comments = ?, rating = ?, publishedstatus = ? WHERE reviewid = " + req.body.reviewid; 

	db.query(updatequery,[req.body.productid, req.body.customerid, req.body.reviewdate, req.body.comments, req.body.rating, req.body.publishedstatus],(err, result) => {
		if (err) {
			console.log(err);
			res.render('error');
		} else {
			res.redirect('/reviews');
		}
		});
    });


    // ==================================================
// Route to delete one specific record.
// URL: http://localhost:3025/reviews/3/delete
// ==================================================
router.get('/:recordid/delete', function(req, res, next) {
    let query = "DELETE FROM reviews WHERE reviewid = " + req.params.recordid;  
    
      // execute query
      db.query(query, (err, result) => {
            if (err) {
                console.log(err);
                res.render('error');
            } else {
                res.redirect('/reviews');
            } 
        });
    });

module.exports = router;