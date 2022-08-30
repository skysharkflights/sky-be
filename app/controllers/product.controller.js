
const Product = require("../models/product.model");
var async = require("async");

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
    Product.getAll((err, data) => {
        if (err){
           res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving products."
          }); 
        } else {
            async.forEachOf(data, (row, i, inner_callback) => {

                Product.getRelatedBrandProducts([row['productid'], row['brandid']], (err, brandProducts) => {
                    if (err){
                        console.log("Error: ", err);
                        data[i]['brand'] = [];
                        inner_callback(null);
                     } else {
                        data[i]['brand'] = brandProducts;
                        inner_callback(null);
                     }
                })
            }, function(err){
                if(err){
                    console.log("Error: ", err);
                }else{
                    res.send(data);
                }
            })
        }
      });
};

// Get a single product by id
exports.getProducts = (req, res) => {
    Product.getProducts((err, data) => {
        if (err){
            res.status(500).send({
             message:
               err.message || "Some error occurred while retrieving products."
           }); 
         } else {
            res.send(data);
         }
    })
};

// Get a single product by id
exports.getProductById = (req, res) => {
    Product.getProductById(req.params.productId, (err, data) => {
        if (err){
            res.status(500).send({
             message:
               err.message || "Some error occurred while retrieving products."
           }); 
         } else {
            res.send(data);
         }
    })
};

// Get a single product by id
exports.getProductByBrandId = (req, res) => {
    Product.getProductByBrandId(req.params.brandId, (err, data) => {
        if (err){
            res.status(500).send({
             message:
               err.message || "Some error occurred while retrieving products."
           }); 
         } else {
            res.send(data);
         }
    })
};

// Get products from brand
exports.getProductsOfSameBrand = (req, res) => {
    Product.getProductsOfSameBrand(req.params.brandId, (err, data) => {
        if (err){
            res.status(500).send({
             message:
               err.message || "Some error occurred while retrieving products."
           }); 
         } else {
            res.send(data);
         }
    })
};

exports.getProductMetaById = (req,res) => {
    Product.getProductMetaById(req.params.productId, (err, data) => {
        if (err){
            res.status(500).send({
             message:
               err.message || "Some error occurred while retrieving products."
           }); 
         } else {
            res.send(data);
         }
    })
}

exports.getProductByCategory = (req,res) => {
    Product.getProductByCategory(req.params.categoryId, (err, data) => {
        if (err){
            res.status(500).send({
             message:
               err.message || "Some error occurred while retrieving products."
           }); 
         } else {
            res.send(data);
         }
    })
}


exports.getProductByPreference = (req,res) => {
    Product.getProductByPreference(req.params.preferenceId, (err, data) => {
        if (err){
            res.status(500).send({
             message:
               err.message || "Some error occurred while retrieving products."
           }); 
         } else {
            res.send(data);
         }
    })
}

// Update a Customer identified by the customerId in the request
exports.update = (req, res) => {
  
};

// Delete a Customer with the specified customerId in the request
exports.delete = (req, res) => {
  
};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
  
};

exports.createProduct = (req, res) => {
    // console.log('29 sep => ', req)
    Product.createProduct(req, (err, data) => {
        if (err){
            res.status(500).send({
             message:
               err.message || "Some error occurred while creating Brand. [getBrandById]"
           }); 
         } else {
            res.send(data);
         }
    })
}

exports.createCategory = (req, res) => {
    console.log('29 createCategory => ', req)
    Product.createCategory(req, (err, data) => {
        if (err){
            res.status(500).send({
             message:
               err.message || "Some error occurred while creating Brand. [getBrandById]"
           }); 
         } else {
            res.send(data);
         }
    })
}

exports.updateCategory = (req, res) => {
    console.log('29 updateCategory => ', req)
    Product.updateCategory(req, (err, data) => {
        if (err){
            res.status(500).send({
             message:
               err.message || "Some error occurred while creating Brand. [getBrandById]"
           }); 
         } else {
            res.send(data);
         }
    })
}

exports.deleteCategoryById = (req, res) => {
    console.log('29 deleteCategoryById => ', req)
    Product.deleteCategoryById(req, (err, data) => {
        if (err){
            res.status(500).send({
             message:
               err.message || "Some error occurred while creating Brand. [getBrandById]"
           }); 
         } else {
            res.send(data);
         }
    })
}

exports.createPreference = (req, res) => {
    console.log('29 createPreference => ', req)
    Product.createPreference(req, (err, data) => {
        if (err){
            res.status(500).send({
             message:
               err.message || "Some error occurred while creating Brand. [getBrandById]"
           }); 
         } else {
            res.send(data);
         }
    })
}

exports.createColor = (req, res) => {
    console.log('29 createColor => ', req.query)
    Product.createColor(req, (err, data) => {
        if (err){
            res.status(500).send({
             message:
               err.message || "Some error occurred while creating Brand. [getBrandById]"
           }); 
         } else {
            res.send(data);
         }
    })
}

exports.updatePreference = (req, res) => {
    console.log('29 updatePreference => ', req)
    Product.updatePreference(req, (err, data) => {
        if (err){
            res.status(500).send({
             message:
               err.message || "Some error occurred while creating Brand. [getBrandById]"
           }); 
         } else {
            res.send(data);
         }
    })
}

exports.deletePreferenceById = (req, res) => {
    console.log('29 deletePreferenceById => ', req)
    Product.deletePreferenceById(req, (err, data) => {
        if (err){
            res.status(500).send({
             message:
               err.message || "Some error occurred while creating Brand. [getBrandById]"
           }); 
         } else {
            res.send(data);
         }
    })
}

exports.deleteColorById = (req, res) => {
    console.log('29 deleteColorById => ', req)
    Product.deleteColorById(req, (err, data) => {
        if (err){
            res.status(500).send({
             message:
               err.message || "Some error occurred while creating Brand. [getBrandById]"
           }); 
         } else {
            res.send(data);
         }
    })
}

exports.createCollection = (req, res) => {
    // console.log('29 sep => ', req)
    Product.createCollection(req, (err, data) => {
        if (err){
            res.status(500).send({
             message:
               err.message || "Some error occurred while creating Brand. [getBrandById]"
           }); 
         } else {
            res.send(data);
         }
    })
}

exports.uploadImages = (req, res) => {
    // console.log('29 sep => ', req)
    Product.uploadImages(req, (err, data) => {
        if (err){
            res.status(500).send({
             message:
               err.message || "Some error occurred while creating Brand. [getBrandById]"
           }); 
         } else {
            res.send(data);
         }
    })
}

// Get a single product by id
exports.getAllCategories = (req, res) => {
    Product.getAllCategories((err, data) => {
        if (err){
            res.status(500).send({
             message:
               err.message || "Some error occurred while retrieving products."
           }); 
         } else {
            res.send(data);
         }
    })
};

// Get a single product by id
exports.getAllColors = (req, res) => {
    Product.getAllColors((err, data) => {
        if (err){
            res.status(500).send({
             message:
               err.message || "Some error occurred while retrieving products."
           }); 
         } else {
            res.send(data);
         }
    })
};

// Get a single product by id
exports.getCategoryById = (req, res) => {
    Product.getCategoryById(req.params.categoryId, (err, data) => {
        if (err){
            res.status(500).send({
             message:
               err.message || "Some error occurred while retrieving category details."
           }); 
         } else {
            res.send(data);
         }
    })
};

// Get a single product by id
exports.getPreferenceyById = (req, res) => {
    Product.getPreferenceyById(req.params.preferenceId, (err, data) => {
        if (err){
            res.status(500).send({
             message:
               err.message || "Some error occurred while retrieving category details."
           }); 
         } else {
            res.send(data);
         }
    })
};

// Get a single product by id
exports.getAllPreferences = (req, res) => {
    Product.getAllPreferences((err, data) => {
        if (err){
            res.status(500).send({
             message:
               err.message || "Some error occurred while retrieving products."
           }); 
         } else {
            res.send(data);
         }
    })
};

exports.applyCoupon = (req, res) => {
    // console.log('29 sep => ', req)
    Product.applyCoupon(req.params.coupon, (err, data) => {
        if (err){
            res.status(500).send({
             message:
               err.message || "Some error occurred while creating Brand. [getBrandById]"
           }); 
         } else {
            res.send(data);
         }
    })
}

exports.getCoupons = (req, res) => {
    // console.log('29 sep => ', req)
    Product.getCoupons(req, (err, data) => {
        if (err){
            res.status(500).send({
             message:
               err.message || "Some error occurred while creating Brand. [getBrandById]"
           }); 
         } else {
            res.send(data);
         }
    })
}

exports.createCoupon = (req, res) => {
    console.log('29 createCoupon => ', req.query)
    Product.createCoupon(req, (err, data) => {
        if (err){
            res.status(500).send({
             message:
               err.message || "Some error occurred while creating Brand. [getBrandById]"
           }); 
         } else {
            res.send(data);
         }
    })
}

exports.getUserCollectionsById = (req, res) => {
    // console.log('29 sep => ', req)
    Product.getUserCollectionsById(req.params.userId, (err, data) => {
        if (err){
            res.status(500).send({
             message:
               err.message || "Some error occurred while creating Brand. [getBrandById]"
           }); 
         } else {
            res.send(data);
         }
    })
}