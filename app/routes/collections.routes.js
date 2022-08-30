const cors = require('cors')
module.exports = app => {
    const collections = require("../controllers/collections.controller");
  
    // Retrieve all Collections
    app.get("/collections/", cors({ origin: true }), collections.getCollections);
  
    // Retrieve a single Customer with customerId
    app.get("/collection/:collectionId", cors({ origin: true }), collections.getCollectionsById);

    app.post('/collection/create', cors({ origin: true }), (req, res) => {
      collections.createCollection(req, res);
    });

    app.post('/collection/add/products', cors({ origin: true }), (req, res) => {
      collections.addCollectionProducts(req, res);
    });

    // Create new category
    app.post('/collection/update', cors({ origin: true }), (req, res) => {
      collections.updateCollection(req, res);
    });

    //Retrieve more products like some product
    app.get("/collections/brand/:brandId", cors({ origin: true }), collections.getCollectionsByBrandId);

    //Retrieve more products like some product
    app.get("/collections/user/:userId", cors({ origin: true }), collections.getCollectionsByUserId);

    // Create new category
    app.post('/collection/delete', cors({ origin: true }), (req, res) => {
      collections.deleteCollectionById(req, res);
    });

    // Create new category
    app.post('/highlight/create', cors({ origin: true }), (req, res) => {
      collections.createHighlight(req, res);
    });

    //Retrieve more products like some product
    app.get("/highlight/brand/:brandId", cors({ origin: true }), collections.getHighlightImagesByBrand);

  };
