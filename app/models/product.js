var mongoose = require('mongoose');

// Defining Product Schema
var productSchema = mongoose.Schema({

	name:{
		type: String,
		required: true
	},
	description:{
		type: String,
		required: true
	},
	price:{
		type: Number,
		required: true
	},
	image:{
		type: String,
		required: true
	},
	created_at:{
		type: Date,
		default: Date.now
	}
});

var Product = module.exports = mongoose.model('Product', productSchema);

// Get All Products

module.exports.getProducts = function(callback, limit){
	Product.find(callback).limit(limit);
}

// Get a Product

module.exports.getProductById = function(id, callback){
	Product.findById(id, callback);
}

// Add a Product

module.exports.addProduct = function(product, callback){
	Product.create(product, callback);
}

// Update a product

module.exports.updateProduct = function(id, product, options, callback){
	var query = {_id: id};
	var update = {
		name: product.name,
		description: product.description,
		price: product.price,
		description: product.image
	}
	Product.findOneAndUpdate(query, update, options,callback);
}

// Delete a Product

module.exports.removeProduct = function(id, callback){
	var query = {_id: id};
	Product.remove(query, callback);
}