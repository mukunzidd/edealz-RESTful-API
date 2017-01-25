
//========== BASE SETUP

// calling needed packages

var express = require('express');
		app = express();
		bodyParser = require('body-parser');
		mongoose = require('mongoose');

// Connect to Mongoose
mongoose.connect('mongodb://localhost/edealzapi');

var Product = require('./app/models/product');
var db = mongoose.connection;


// configure app to use bodyParser()
// this lets me get data from POST requests

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));


// setting the port for our app

var port = process.env.PORT || 4000;


//========== ROUTES FOR MY API
// getting an instance for my app

var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next){
	// do logging
	console.log('Something is happening');
	next(); // making usre we go to the next route and not stop there
});

// test route
router.get('/', function (req, res) {
  res.json({ message: 'Hooray! I did it again...'});
})


// RESTful routes here
// on routes that end in /products

router.route('/products')

    // create a product (accessed at POST http://localhost:4000/api/products)
    .post(function(req, res) {
        
        var product = new Product();      // create a new instance of the Product model
        product.name = req.body.name;  // set the products name (comes from the request)
        product.description = req.body.description;  // set the products description (comes from the request)
        product.price = req.body.price;  // set the products price (comes from the request)
        product.image = req.body.image;  // set the products image (comes from the request)

        // save the product and check for errors
        product.save(function(err) {
            if (err)
                res.send(err);
            res.json({ message: 'Product created!' });
        });
        
    })

    // get all the products (accessed at GET http://localhost:4000/api/products)
    .get(function(req, res) {
    	Product.find(function(err, products) {
            if (err)
                res.send(err);

            res.json(products);
        });
    });

// on routes that end in /products/:product_id
router.route('/products/:product_id')
		// getting the product (accessed at GET http://localhost:4000/api/products/:product_id)
		.get(function(req, res) {
		  Product.findById(req.params.product_id, function(err, product){
		  			if (err)
		  				res.send(err);
		  			res.json(product);
		  });
		});

		// updating the product (accessed at PATCH http://localhost:4000/api/products/:product_id)
    router.put(function(req, res) {
        // use our product model to find the product we want
        Product.findById(req.params.product_id, function(err, product) {

            if (err)
                res.send(err);

            product.name = req.body.name;  // update the products info
            product.description = req.body.description;
            product.price = req.body.price;
            product.image = req.body.image;

            // save the product
            product.save(function(err) {
                if (err)
                    res.send(err);
                res.json({ message: 'Product updated!' });
            });

        });
    });

    // delete the product with this id (accessed at DELETE http://localhost:8080/api/bears/:product_id)
    router.delete(function(req, res) {
        Product.remove({
            _id: req.params.product_id
        }, function(err, product) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });

//========== REGISTER ALL ROUTES
// adding routes prefixer at /api

app.use('/api', router);

//========== START THE SERVER

app.listen(port);
console.log('eDealz is up and listening on port ' + port + '...');





