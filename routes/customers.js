var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');


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
    let query = "SELECT customerid, firstname, lastname, city, state, email, phonenum, password FROM customers WHERE customerid = " + req.params.recordid; 
    
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
// URL: http://localhost:3025/customers/addrecord
// ==================================================
router.get('/addrecord', function(req, res, next) {
	res.render('customers/addrec');
});


// ==================================================
// Route Enable Registration
// ==================================================
router.get('/register', function(req, res, next) {
	res.render('customers/addrec');
});


// ==================================================
// Route Provide Login Window
// URL: https://localhost:3025/customers/login
// ==================================================
router.get('/login', function(req, res, next) {
	res.render('customers/login', {message: "Please Login"});
});


// ==================================================
// Route Check Login Credentials
// ==================================================
router.post('/login', function(req, res, next) {
    let query = "SELECT customerid, firstname, lastname, password from customers WHERE username = '" + req.body.username + "'"; 
    // execute query
    db.query(query, (err, result) => {
          if (err) {res.render('error');} 
          else {
              if(result[0])
                  {
                  // Username was correct. Check if password is correct
                  bcrypt.compare(req.body.password, result[0].password, function(err, result1) {
                      if(result1) {
                          // Password is correct. Set session variables for user.
                          var custid = result[0].customerid;
                          req.session.customerid = custid;
                          var custname = result[0].firstname + " "+ result[0].lastname;
                          req.session.custname = custname;
                          res.redirect('/');
                      } else {
                          // password do not match
                          res.render('customers/login', {message: "Wrong Password"});
                      }
                  });
                  }
              else {res.render('customers/login', {message: "Wrong Username"});}
          } 
       });
  });

  
// ==================================================
// Route To Logout Credentials
// ==================================================
router.get('/logout', function(req, res, next) {
	req.session.customerid = 0;
	req.session.custname = "";
   	req.session.cart=[];
    	req.session.qty=[];
	res.redirect('/');
});

  

// ==================================================
// Route to obtain user input and save in database.
// ==================================================
router.post('/', function(req, res, next) {

    let insertquery = "INSERT INTO customers (firstname, lastname, address1, city, state, zip, email, phonenum, datejoined, username, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"; 
    
    bcrypt.genSalt(10, (err, salt) => {
		bcrypt.hash(req.body.password, salt, (err, hash) => {
			if(err) { res.render('error');}
            db.query(insertquery,[req.body.firstname, req.body.lastname, req.body.address1, req.body.city, req.body.state, req.body.zip, req.body.email, req.body.phonenum, req.body.datejoined, req.body.username, hash],(err, result) => {
                if (err) {
                        console.log(err);
                        res.render('error');
                }
            res.redirect('/customers');
            });
        });
    });

});


// ==================================================
// Route to edit one specific record.
// URL: http://localhost:3025/customers/3/edit
// ==================================================
router.get('/:recordid/edit', function(req, res, next) {
    let query = "SELECT customerid, firstname, lastname, address1, city, state, zip, email, phonenum, datejoined, password FROM customers WHERE customerid = " + req.params.recordid;
    
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


