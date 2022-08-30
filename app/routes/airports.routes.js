const cors = require('cors')
module.exports = app => {
    const airports = require("../controllers/airports.controller");
  
    // Create a new Customer
    // app.post("/customers", customers.create);
  
    // Retrieve all Customers
    app.get("/airports/:keyword", cors({ origin: true }), airports.getAirports);
  
    app.post('/flight/search', cors({ origin: true }), (req, res) => {
      airports.flightSearch(req, res);
    });

    app.post('/flight/price/search', cors({ origin: true }), (req, res) => {
      airports.flightPriceSearch(req, res);
    });

    app.get("/airline/:airlineCode", cors({ origin: true }), airports.getAirlineDetails);











    // -----------------------------------------------------------------

    // Retrieve a single Customer with customerId
    app.get("/product/:productId", cors({ origin: true }), airports.getProductById);

    // Retrieve a single Customer with customerId
    app.get("/product/brand/:brandId", cors({ origin: true }), airports.getProductByBrandId);

    //Retrieve more products like some product
    app.get("/product/samebrand/:brandId", cors({ origin: true }), airports.getProductsOfSameBrand);

    //Retrieve more products like some product
    app.get("/product/meta/:productId", cors({ origin: true }), airports.getProductMetaById);

    // Retrieve a single Customer with customerId
    app.get("/product/category/:categoryId", cors({ origin: true }), airports.getProductByCategory);

    // Retrieve a single Customer with customerId
    app.get("/product/preference/:preferenceId", cors({ origin: true }), airports.getProductByPreference);

    app.post('/product/create', cors({ origin: true }), (req, res) => {
      airports.createProduct(req, res);
    });
  
    app.post('/images/upload', cors({ origin: true }), (req, res) => {
      airports.uploadImages(req, res);
    });

    // Retrieve all categories
    app.get("/categories/", cors({ origin: true }), airports.getAllCategories);

    // Retrieve a single Category with categoryId
    app.get("/category/:categoryId", cors({ origin: true }), airports.getCategoryById);

    // Create new category
    app.post('/category/create', cors({ origin: true }), (req, res) => {
      airports.createCategory(req, res);
    });

    // Create new category
    app.post('/category/update', cors({ origin: true }), (req, res) => {
      airports.updateCategory(req, res);
    });

    // Create new category
    app.post('/category/delete', cors({ origin: true }), (req, res) => {
      airports.deleteCategoryById(req, res);
    });

    // Retrieve all preferences
    app.get("/preferences/", cors({ origin: true }), airports.getAllPreferences);

    // Retrieve a single Category with categoryId
    app.get("/preference/:preferenceId", cors({ origin: true }), airports.getPreferenceyById);

    // Create new Preference
    app.post('/preference/create', cors({ origin: true }), (req, res) => {
      airports.createPreference(req, res);
    });

    // Create new Preference
    app.post('/preference/update', cors({ origin: true }), (req, res) => {
      airports.updatePreference(req, res);
    });

    // Delete Preference
    app.post('/preference/delete', cors({ origin: true }), (req, res) => {
      airports.deletePreferenceById(req, res);
    });

    // Create new Preference
    app.post('/color/create', cors({ origin: true }), (req, res) => {
      console.log('createColor => ', req)
      airports.createColor(req, res);
    });

    // Create new Preference
    app.post('/color/delete', cors({ origin: true }), (req, res) => {
      airports.deleteColorById(req, res);
    });
  
    // Retrieve all preferences
    app.get("/colors/", cors({ origin: true }), airports.getAllColors);

  };
