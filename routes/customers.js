var express = require('express');
var router = express.Router();

// ==================================================
// Route to list all records. Display view to list all records
// URL: http://localhost:3025/customers/
// ==================================================

router.get('/', function(req, res, next) {
let query = "SELECT customerid, firstname, lastname, city, state, email, phonenum FROM customers";
  // execute query
  db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        }
    res.render('customers/allrecords', {allrecs: result });
    });
});


// ==================================================
// Route to view one specific record. Notice the view is one record
// URL: http://localhost:3025/customers/3/show
// ==================================================
router.get('/:recordid/show', function(req, res, next) {
    let query = "SELECT customerid, firstname, lastname, city, state, email, phonenum FROM customers WHERE customerid = " + req.params.recordid; 
    
    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.render('customers/onerec', {onerec: result[0] });
        } 
    });
});


// ==================================================
// Route to show empty form to obtain input form end-user.
// URL: http://localhost:3025:/customers/addrecord
// ==================================================
router.get('/addrecord', function(req, res, next) {
	res.render('customers/addrec');
});

// ==================================================
// Route to obtain user input and save in database.
// ==================================================
router.post('/', function(req, res, next) {

    let insertquery = "INSERT INTO customers (firstname, lastname, address1, city, state, zip, email, phonenum, datejoined, username, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"; 
    
    db.query(insertquery,[req.body.firstname, req.body.lastname, req.body.address1, req.body.city, req.body.state, req.body.zip, req.body.email, req.body.phonenum, req.body.datejoined, req.body.username, req.body.password],(err, result) => {
        if (err) {
                console.log(err);
                res.render('error');
            } else {
                res.redirect('/customers');
                }
            });
    });


// ==================================================
// Route to edit one specific record.
// URL: http://localhost:3025/customers/3/edit
// ==================================================
router.get('/:recordid/edit', function(req, res, next) {
    let query = "SELECT customerid, firstname, lastname, address1, city, state, zip, email, phonenum, datejoined FROM customers WHERE customerid = " + req.params.recordid;
    
      // execute query
      db.query(query, (err, result) => {
            if (err) {
                console.log(err);
                res.render('error');
            } else {
                res.render('customers/editrec', {onerec: result[0] });
            } 
        });
    });


// ==================================================
// Route to save edited data in database.
// ==================================================
router.post('/save', function(req, res, next) {
	let updatequery = "UPDATE customers SET firstname = ?, lastname = ?, address1 = ?, city = ?, state = ?, email = ?, phonenum = ? WHERE customerid = " + req.body.customerid; 

	db.query(updatequery,[req.body.firstname, req.body.lastname, req.body.address1, req.body.city, req.body.state, req.body.email, req.body.phonenum],(err, result) => {
		if (err) {
			console.log(err);
			res.render('error');
		} else {
			res.redirect('/customers');
		}
		});
    });


// ==================================================
// Route to delete one specific record.
// URL: http://localhost:3025/customers/3/delete
// ==================================================
router.get('/:recordid/delete', function(req, res, next) {
    let query = "DELETE FROM customers WHERE customerid = " + req.params.recordid;  
    
      // execute query
      db.query(query, (err, result) => {
            if (err) {
                console.log(err);
                res.render('error');
            } else {
                res.redirect('/customers');
            } 
        });
    });
           

module.exports = router;


