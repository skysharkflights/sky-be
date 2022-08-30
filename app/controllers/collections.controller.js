
const Collections = require("../models/collections.model");
var async = require("async");

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
    Collections.getAll((err, data) => {
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
exports.getCollections = (req, res) => {
    Collections.getCollections((err, data) => {
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
exports.getCollectionsById = (req, res) => {
    Collections.getCollectionsById(req.params.productId, (err, data) => {
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
exports.getCollectionsByBrandId = (req, res) => {
    Collections.getCollectionsByBrandId(req.params.brandId, (err, data) => {
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
exports.getHighlightImagesByBrand = (req, res) => {
    Collections.getHighlightImagesByBrand(req.params.brandId, (err, data) => {
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
exports.getCollectionsByUserId = (req, res) => {
    Collections.getCollectionsByUserId(req.params.productId, (err, data) => {
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



// Update a Customer identified by the customerId in the request
exports.update = (req, res) => {
  
};

// Delete a Customer with the specified customerId in the request
exports.delete = (req, res) => {
  
};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
  
};

// exports.createCollection = (req, res) => {
//     // console.log('29 sep => ', req)
//     Collections.createCollection(req, (err, data) => {
//         if (err){
//             res.status(500).send({
//              message:
//                err.message || "Some error occurred while creating Brand. [getBrandById]"
//            }); 
//          } else {
//             res.send(data);
//          }
//     })
// }

exports.addCollectionProducts = (req, res) => {
    // console.log('29 sep => ', req)
    Collections.addCollectionProducts(req, (err, data) => {
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

exports.updateCollection = (req, res) => {
    console.log('29 updateCategory => ', req)
    Collections.updateCollection(req, (err, data) => {
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

exports.deleteCollectionById = (req, res) => {
    console.log('29 deleteCategoryById => ', req)
    Collections.deleteCollectionById(req, (err, data) => {
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

exports.createHighlight = (req, res) => {
    console.log('29 createHighlight => ', req)
    Collections.createHighlight(req, (err, data) => {
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
    Collections.uploadImages(req, (err, data) => {
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