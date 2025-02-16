var express = require('express');
var router = express.Router();

// ==================================================
// Route to list all records. Display view to list all records
// ==================================================

router.get('/', function(req, res, next) {
let query = "SELECT inventoryid, productid, stocklvl, supplierid, costperunit FROM inventory"; 

  // execute query
  db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        }
    res.render('inventory/allrecords', {allrecs: result });
    });
});

// ==================================================
// Route to view one specific record. Notice the view is one record
// URL: http://localhost:3025/inventory/3/show
// ==================================================
router.get('/:recordid/show', function(req, res, next) {
    let query = "SELECT inventoryid, productid, stocklvl, supplierid, costperunit FROM inventory WHERE inventoryid = " + req.params.recordid; 
    
    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.render('inventory/onerec', {onerec: result[0] });
        } 
    });
});

// ==================================================
// Route to show empty form to obtain input form end-user.
// URL: http://localhost:3025:/inventory/addrecord
// ==================================================
router.get('/addrecord', function(req, res, next) {
	res.render('inventory/addrec');
});

// ==================================================
// Route to obtain user input and save in database.
// NOTE: PRODUCTID AND SUPPLIERID MUST ALREADY EXIST TO ADD A NEW RECORD
// ==================================================
router.post('/', function(req, res, next) {

    let insertquery = "INSERT INTO inventory (productid, stocklvl, supplierid, costperunit) VALUES (?, ?, ?, ?)"; 
    
    db.query(insertquery,[req.body.productid, req.body.stocklvl, req.body.supplierid, req.body.costperunit],(err, result) => {
        if (err) {
                console.log(err);
                res.render('error');
            } else {
                res.redirect('/inventory');
                }
            });
    });

// ==================================================
// Route to edit one specific record.
// URL: http://localhost:3025/inventory/3/edit
// ==================================================
router.get('/:recordid/edit', function(req, res, next) {
    let query = "SELECT inventoryid, productid, stocklvl, supplierid, costperunit FROM inventory WHERE inventoryid = " + req.params.recordid;
    
      // execute query
      db.query(query, (err, result) => {
            if (err) {
                console.log(err);
                res.render('error');
            } else {
                res.render('inventory/editrec', {onerec: result[0] });
            } 
        });
    });


// ==================================================
// Route to save edited data in database.
// ==================================================
router.post('/save', function(req, res, next) {
	let updatequery = "UPDATE inventory SET productid = ?, stocklvl = ?, supplierid = ?, costperunit = ? WHERE inventoryid = " + req.body.inventoryid; 

	db.query(updatequery,[req.body.productid, req.body.stocklvl, req.body.supplierid, req.body.costperunit],(err, result) => {
		if (err) {
			console.log(err);
			res.render('error');
		} else {
			res.redirect('/inventory');
		}
		});
    });


    // ==================================================
// Route to delete one specific record.
// URL: http://localhost:3025/inventory/3/delete
// ==================================================
router.get('/:recordid/delete', function(req, res, next) {
    let query = "DELETE FROM inventory WHERE inventoryid = " + req.params.recordid;  
    
      // execute query
      db.query(query, (err, result) => {
            if (err) {
                console.log(err);
                res.render('error');
            } else {
                res.redirect('/inventory');
            } 
        });
    });

module.exports = router;