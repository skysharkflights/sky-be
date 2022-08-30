
const Airports = require("../models/airports.model");
var async = require("async");

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
    Airports.getAll((err, data) => {
        if (err){
           res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving products."
          }); 
        } else {
            async.forEachOf(data, (row, i, inner_callback) => {

                Airports.getRelatedBrandProducts([row['productid'], row['brandid']], (err, brandProducts) => {
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
exports.getAirports = (req, res) => {
    Airports.getAirports(req.params.keyword, (err, data) => {
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

exports.flightSearch = (req, res) => {
    Airports.flightSearch(req, (err, data) => {
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

exports.flightPriceSearch = (req, res) => {
    Airports.flightPriceSearch(req, (err, data) => {
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


exports.getAirlineDetails = (req, res) => {
    Airports.getAirlineDetails(req.params.airlineCode, (err, data) => {
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
    Airports.getProductById(req.params.productId, (err, data) => {
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
    Airports.getProductByBrandId(req.params.brandId, (err, data) => {
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
    Airports.getProductsOfSameBrand(req.params.brandId, (err, data) => {
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
    Airports.getProductMetaById(req.params.productId, (err, data) => {
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
    Airports.getProductByCategory(req.params.categoryId, (err, data) => {
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
    Airports.getProductByPreference(req.params.preferenceId, (err, data) => {
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
    Airports.createProduct(req, (err, data) => {
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
    Airports.createCategory(req, (err, data) => {
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
    Airports.updateCategory(req, (err, data) => {
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
    Airports.deleteCategoryById(req, (err, data) => {
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
    Airports.createPreference(req, (err, data) => {
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
    Airports.createColor(req, (err, data) => {
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
    Airports.updatePreference(req, (err, data) => {
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
    Airports.deletePreferenceById(req, (err, data) => {
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
    Airports.deleteColorById(req, (err, data) => {
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
    Airports.uploadImages(req, (err, data) => {
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
    Airports.getAllCategories((err, data) => {
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
    Airports.getAllColors((err, data) => {
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
    Airports.getCategoryById(req.params.categoryId, (err, data) => {
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
    Airports.getPreferenceyById(req.params.preferenceId, (err, data) => {
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
    Airports.getAllPreferences((err, data) => {
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