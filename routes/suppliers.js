var express = require('express');
var router = express.Router();

// ==================================================
// Route to list all records. Display view to list all records
// ==================================================

router.get('/', function(req, res, next) {
let query = "SELECT supplierid, suppliername, website, suppliernum, supplieremail FROM suppliers"; 

  // execute query
  db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        }
    res.render('suppliers/allrecords', {allrecs: result });
    });
});

// ==================================================
// Route to view one specific record. Notice the view is one record
// URL: http://localhost:3025/suppliers/3/show
// ==================================================
router.get('/:recordid/show', function(req, res, next) {
    let query = "SELECT supplierid, suppliername, website, suppliernum, supplieremail FROM suppliers WHERE supplierid = " + req.params.recordid; 
    
    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.render('suppliers/onerec', {onerec: result[0] });
        } 
    });
});

// ==================================================
// Route to show empty form to obtain input form end-user.
// URL: http://localhost:3025:/suppliers/addrecord
// ==================================================
router.get('/addrecord', function(req, res, next) {
	res.render('suppliers/addrec');
});

// ==================================================
// Route to obtain user input and save in database.
// ==================================================
router.post('/', function(req, res, next) {

    let insertquery = "INSERT INTO suppliers (supplierid, suppliername, website, suppliernum, supplieremail) VALUES (?, ?, ?, ?, ?)"; 
    
    db.query(insertquery,[req.body.supplierid, req.body.suppliername, req.body.website, req.body.suppliernum, req.body.supplieremail],(err, result) => {
        if (err) {
                console.log(err);
                res.render('error');
            } else {
                res.redirect('/suppliers');
                }
            });
    });

// ==================================================
// Route to edit one specific record.
// URL: http://localhost:3025/suppliers/3/edit
// ==================================================
router.get('/:recordid/edit', function(req, res, next) {
    let query = "SELECT supplierid, suppliername, website, suppliernum, supplieremail FROM suppliers WHERE supplierid = " + req.params.recordid;
    
      // execute query
      db.query(query, (err, result) => {
            if (err) {
                console.log(err);
                res.render('error');
            } else {
                res.render('suppliers/editrec', {onerec: result[0] });
            } 
        });
    });


// ==================================================
// Route to save edited data in database.
// ==================================================
router.post('/save', function(req, res, next) {
	let updatequery = "UPDATE suppliers SET suppliername = ?, website = ?, suppliernum = ?, supplieremail = ? WHERE supplierid = " + req.body.supplierid; 

	db.query(updatequery,[req.body.suppliername, req.body.website, req.body.suppliernum, req.body.supplieremail],(err, result) => {
		if (err) {
			console.log(err);
			res.render('error');
		} else {
			res.redirect('/suppliers');
		}
		});
    });


    // ==================================================
// Route to delete one specific record.
// URL: http://localhost:3025/suppliers/3/delete
// ==================================================
router.get('/:recordid/delete', function(req, res, next) {
    let query = "DELETE FROM suppliers WHERE supplierid = " + req.params.recordid;  
    
      // execute query
      db.query(query, (err, result) => {
            if (err) {
                console.log(err);
                res.render('error');
            } else {
                res.redirect('/suppliers');
            } 
        });
    });

module.exports = router;