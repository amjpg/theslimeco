var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('reports/menu');
});

// ==================================================
// Route to list all records. Display view to list all records
// URL: http://localhost:3025/reports/custlist
// ==================================================

router.get('/customers', function(req, res, next) {
    let query = "SELECT customerid, firstname, lastname, city, state, email, phonenum FROM customers";
        
        // execute query
        db.query(query, (err, result) => {
            if (err) {
                console.log(err);
                res.render('error');
            }
        res.render('reports/custlist', {allrecs: result });
    });
});

// ==================================================
// Route to list all records. Display view to list all records
// URL: http://localhost:3025/reports/prodlist
// ==================================================

router.get('/products', function(req, res, next) {
    let query = "SELECT productid, productname, description, price, features, color FROM products"; 
    
      // execute query
      db.query(query, (err, result) => {
            if (err) {
                console.log(err);
                res.render('error');
            }
        res.render('reports/prodlist', {allrecs: result });
         });
    });


// ==================================================
// Route to list all records. Display view to list all records
// URL: http://localhost:3025/reports/saleslist
// ==================================================

router.get('/sales', function(req, res, next) {
    let query = "SELECT saleorderid, customerid, totalAmt, orderstatus FROM sales"; 
    
      // execute query
      db.query(query, (err, result) => {
            if (err) {
                console.log(err);
                res.render('error');
            }
        res.render('reports/saleslist', {allrecs: result });
         });
    });
    

module.exports = router;