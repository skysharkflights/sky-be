const cors = require('cors')
module.exports = app => {
    const brand = require("../controllers/brand.controller");
    // Create a new Customer
    // app.post("/customers", customers.create);
  
    // Retrieve all Customers
    app.get("/brands", cors({ origin: true }), brand.getAll);
  
    // Retrieve a brand by brandId
    app.get("/brand/:brandId", cors({ origin: true }), brand.getBrandById);

    app.post('/brand/create', cors({ origin: true }), (req, res) => {
      brand.createBrand(req, res);
      // console.log(“User name = “+user_name+”, password is “+password);
      // res.end('');
      });

    //Retrieve more products like some product
    // app.get("/product/samebrand/:brandId", cors({ origin: true }), products.getProductsOfSameBrand);
  
    // Update a Customer with customerId
    // app.put("/customers/:customerId", customers.update);
  
    // Delete a Customer with customerId
    // app.delete("/customers/:customerId", customers.delete);
  
    // Create a new Customer
    // app.delete("/customers", customers.deleteAll);
  };
