 
//========== BASE SETUP

// calling needed packages

var express = require('express');
var	app = express();
var	bodyParser = require('body-parser');
var	mongoose = require('mongoose');

Product = require('./app/models/product');

// Connect to Mongoose
mongoose.connect('mongodb://localhost/edealzapi');
var db = mongoose.connection;



// configure app to use bodyParser()
// this lets me get data from POST requests

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));

// test route on root
app.get('/', function (req, res) {
  res.send('Please use /api/products...');
});

// Get all the products
app.get('/api/products', function(req, res){
    Product.getProducts(function(err, products){
        if(err){
            throw err;
        }
        res.json(products);
    });
});

// Get a product
app.get('/api/products/:_id', function(req, res){
    Product.getProductById(req.params._id, function(err, product){
        if(err){
            throw err;
        }
        res.json(product);
    });
});

// Get a product
app.post('/api/products', function(req, res){
    var product = req.body;
    Product.addProduct(product, function(err, product){
        if(err){
            throw err;
        }
        res.json(product);
    });
});

// Update a product
app.put('/api/products/:_id', function(req, res){
    var id = req.params._id;
    var product = req.body;
    Product.updateProduct(id, product, {}, function(err, product){
        if(err){
            throw err;
        }
        res.json(product);
    });
});

//========== START THE SERVER

app.listen(3000);
    console.log('eDealz is up and listening on port 3000...');





