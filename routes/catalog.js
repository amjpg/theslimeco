var express = require('express');
var router = express.Router();

// ==================================================
// Route to list all products on the catalog
// ==================================================
router.get('/', function(req, res, next) {
	let query = "SELECT productid, productname, prodimage, description, price, features, color, homepage FROM products";   

  // execute query
  db.query(query, (err, result) => {
  if (err) {
          res.render('error');
      }
  res.render('catalog', {allrecs: result });
   });
});

// ==================================================
// Route to add an item to the cart
// ==================================================
router.post('/add', function(req, res, next) {
	if (typeof req.session.cart !== 'undefined' && req.session.cart ) {
		if (req.session.cart.includes(req.body.productid))
			{
				// Item Exists in Basket - Increase Quantity 
				var n = req.session.cart.indexOf(req.body.productid);
				req.session.qty[n] = parseInt(req.session.qty[n]) + parseInt(req.body.qty);
			}
		else
			{
				// Item Being Added First Time
				req.session.cart.push(req.body.productid);
				req.session.qty.push(req.body.qty);
			}
	}else {
		var cart = [];
		cart.push(req.body.productid);
		req.session.cart = cart;
		
		var qty = [];
		qty.push(req.body.qty);
		req.session.qty = qty;
	}
  res.redirect('/catalog/cart');
});

// ==================================================
// Route to show shopping cart
// ==================================================
router.get('/cart', function(req, res, next) {
	if (!Array.isArray(req.session.cart) || !req.session.cart.length){
		res.render('cart', {cartitems: 0 });
	} else {	

 		let query = "SELECT productid, productname, prodimage, price from products WHERE productid IN (" + req.session.cart + ") order by find_in_set(productid, '" + req.session.cart + "');"; 

		// execute query
		db.query(query, (err, result) => {
			if (err) {
                    res.render('error');
            } else {
                   res.render('cart', {cartitems: result, qtys: req.session.qty  });
                }
		});
	}
});

// ==================================================
// Route to remove an item from the cart
// ==================================================
router.post('/remove', function(req, res, next) {
  // Find the element index of the auto_id that needs to be removed
  var n = req.session.cart.indexOf(req.body.productid);

    // Remove element from cart and quantity arrays
    req.session.cart.splice(n,1);
    req.session.qty.splice(n,1);

    res.redirect('/catalog/cart');

});

// ==================================================
// Route save cart items to SALES and ORDERDETAILS tables
// ==================================================
router.get('/checkout', function(req, res, next) {
	// Check to make sure the customer has logged-in
	if (typeof req.session.customerid !== 'undefined' && req.session.customerid ) {
		// Save SALES Record:
		let insertquery = "INSERT INTO sales(customerid, orderdate, discount, paymentmethod, orderstatus) VALUES (?, now(), '0', 'Credit Card', 'Paid')"; 
		db.query(insertquery,[req.session.customerid],(err, result) => {
			if (err) {
				console.log(err);
				res.render('error');
			} else {
				// Obtain the order_id value of the newly created SALEORDER Record
				var orderid = result.insertId;
				// Save ORDERDETAILS Records
				// There could be one or more items in the shopping cart
				req.session.cart.forEach((cartitem, index) => { 
					// Perform ORDERDETAIL table insert
					let insertquery = "INSERT INTO orderdetails(orderid, productid, quantity, unitprice) VALUES (?, ?, (SELECT unitprice from orderdetails where productid = " + cartitem + "), ?)";
					db.query(insertquery,[orderid, cartitem, req.session.qty[index]],(err, result) => {
						if (err) {res.render('error');}
					});
				});
				// Empty out the items from the cart and quantity arrays
				req.session.cart = [];
				req.session.qty = [];
				// Display confirmation page
				res.render('checkout', {ordernum: orderid });
				}		
			});
	}
	else {
		// Prompt customer to login
		res.redirect('/customers/login');
	}
});



module.exports = router;
