const cors = require('cors')
module.exports = app => {
    const products = require("../controllers/product.controller");
  
    // Retrieve all Customers
    app.get("/products/", cors({ origin: true }), products.getProducts);
  
    // Retrieve a single Customer with customerId
    app.get("/product/:productId", cors({ origin: true }), products.getProductById);

    // Retrieve a single Customer with customerId
    app.get("/product/brand/:brandId", cors({ origin: true }), products.getProductByBrandId);

    //Retrieve more products like some product
    app.get("/product/samebrand/:brandId", cors({ origin: true }), products.getProductsOfSameBrand);

    //Retrieve more products like some product
    app.get("/product/meta/:productId", cors({ origin: true }), products.getProductMetaById);

    // Retrieve a single Customer with customerId
    app.get("/product/category/:categoryId", cors({ origin: true }), products.getProductByCategory);

    // Retrieve a single Customer with customerId
    app.get("/product/preference/:preferenceId", cors({ origin: true }), products.getProductByPreference);

    app.post('/product/create', cors({ origin: true }), (req, res) => {
      products.createProduct(req, res);
    });
  
    app.post('/images/upload', cors({ origin: true }), (req, res) => {
      products.uploadImages(req, res);
    });

    // Retrieve all categories
    app.get("/categories/", cors({ origin: true }), products.getAllCategories);

    // Retrieve a single Category with categoryId
    app.get("/category/:categoryId", cors({ origin: true }), products.getCategoryById);

    // Create new category
    app.post('/category/create', cors({ origin: true }), (req, res) => {
      products.createCategory(req, res);
    });

    // Create new category
    app.post('/category/update', cors({ origin: true }), (req, res) => {
      products.updateCategory(req, res);
    });

    // Create new category
    app.post('/category/delete', cors({ origin: true }), (req, res) => {
      products.deleteCategoryById(req, res);
    });

    // Retrieve all preferences
    app.get("/preferences/", cors({ origin: true }), products.getAllPreferences);

    // Retrieve a single Category with categoryId
    app.get("/preference/:preferenceId", cors({ origin: true }), products.getPreferenceyById);

    // Create new Preference
    app.post('/preference/create', cors({ origin: true }), (req, res) => {
      products.createPreference(req, res);
    });

    // Create new Preference
    app.post('/preference/update', cors({ origin: true }), (req, res) => {
      products.updatePreference(req, res);
    });

    // Delete Preference
    app.post('/preference/delete', cors({ origin: true }), (req, res) => {
      products.deletePreferenceById(req, res);
    });

    // Create new Preference
    app.post('/color/create', cors({ origin: true }), (req, res) => {
      console.log('createColor => ', req)
      products.createColor(req, res);
    });

    // Create new Preference
    app.post('/color/delete', cors({ origin: true }), (req, res) => {
      products.deleteColorById(req, res);
    });
  
    // Retrieve all preferences
    app.get("/colors/", cors({ origin: true }), products.getAllColors);

    app.post('/collection/create', cors({ origin: '*' }), (req, res) => {
      products.createCollection(req, res);
    });

    app.get('/coupon/apply/:coupon', cors({ origin: '*' }), (req, res) => {
      products.applyCoupon(req, res);
    });

    app.get('/coupons', cors({ origin: '*' }), (req, res) => {
      products.getCoupons(req, res);
    });

    // Create new coupon
    app.post('/coupon/create', cors({ origin: true }), (req, res) => {
      products.createCoupon(req, res);
    });

    app.get('/collections/:userId', cors({ origin: '*' }), (req, res) => {
      products.getUserCollectionsById(req, res);
    });

  };
