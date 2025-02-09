var express = require('express');
var router = express.Router();

// ==================================================
// Route to list all records. Display view to list all records
// ==================================================

router.get('/', function(req, res, next) {
let query = "SELECT marketingpromoid, promoname, startdate, enddate, budget, performance FROM marketing"; 

  // execute query
  db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        }
    res.render('marketing/allrecords', {allrecs: result });
    });
});

// ==================================================
// Route to view one specific record. Notice the view is one record
// URL: http://localhost:3025/marketing/3/show
// ==================================================
router.get('/:recordid/show', function(req, res, next) {
    let query = "SELECT marketingpromoid, promoname, startdate, enddate, budget, performance FROM marketing WHERE marketingpromoid = " + req.params.recordid; 
    
    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.render('marketing/onerec', {onerec: result[0] });
        } 
    });
});


// ==================================================
// Route to show empty form to obtain input form end-user.
// URL: http://localhost:3025:/marketing/addrecord
// ==================================================
router.get('/addrecord', function(req, res, next) {
	res.render('marketing/addrec');
});


// ==================================================
// Route to obtain user input and save in database.
// ==================================================
router.post('/', function(req, res, next) {

    let insertquery = "INSERT INTO marketing (promoname, startdate, enddate, budget, platform, performance) VALUES (?, ?, ?, ?, ?, ?)"; 
    
    db.query(insertquery,[req.body.promoname, req.body.startdate, req.body.enddate, req.body.budget, req.body.platform, req.body.performance],(err, result) => {
        if (err) {
                console.log(err);
                res.render('error');
            } else {
                res.redirect('/marketing');
                }
            });
    });


// ==================================================
// Route to edit one specific record.
// URL: http://localhost:3025/marketing/3/edit
// NOTE: WHEN EDITING DATE, THE ORDER DATE MUST BE RETYPED TO NUMERIC. EXAMPLE: 2025-02-08.
// ==================================================
router.get('/:recordid/edit', function(req, res, next) {
    let query = "SELECT marketingpromoid, promoname, startdate, enddate, budget, platform, performance FROM marketing WHERE marketingpromoid = " + req.params.recordid;
    
      // execute query
      db.query(query, (err, result) => {
            if (err) {
                console.log(err);
                res.render('error');
            } else {
                res.render('marketing/editrec', {onerec: result[0] });
            } 
        });
    });


// ==================================================
// Route to save edited data in database.
// ==================================================
router.post('/save', function(req, res, next) {
	let updatequery = "UPDATE marketing SET promoname = ?, startdate = ?, enddate = ?, budget = ?, platform = ?, performance = ? WHERE marketingpromoid = " + req.body.marketingpromoid; 

	db.query(updatequery,[req.body.promoname, req.body.startdate, req.body.enddate, req.body.budget, req.body.platform, req.body.performance],(err, result) => {
		if (err) {
			console.log(err);
			res.render('error');
		} else {
			res.redirect('/marketing');
		}
		});
    });


    // ==================================================
// Route to delete one specific record.
// URL: http://localhost:3025/marketing/3/delete
// ==================================================
router.get('/:recordid/delete', function(req, res, next) {
    let query = "DELETE FROM marketing WHERE marketingpromoid = " + req.params.recordid;  
    
      // execute query
      db.query(query, (err, result) => {
            if (err) {
                console.log(err);
                res.render('error');
            } else {
                res.redirect('/marketing');
            } 
        });
    });


module.exports = router;