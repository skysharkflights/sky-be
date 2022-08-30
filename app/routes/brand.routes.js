const cors = require('cors')
module.exports = app => {
    const brand = require("../controllers/brand.controller");
    // Retrieve all Customers
    app.get("/brands", cors({ origin: true }), brand.getAll);
  
    // Retrieve a brand by brandId
    app.get("/brand/:brandId", cors({ origin: true }), brand.getBrandById);

    app.post('/brand/create', cors({ origin: true }), (req, res) => {
      brand.createBrand(req, res);
      // console.log(“User name = “+user_name+”, password is “+password);
      // res.end('');
      });

    app.get("/slides", cors({ origin: true }), brand.getAllSlides);

    app.post('/slide/create', cors({ origin: true }), (req, res) => {
      brand.createSlide(req, res);
      });

    app.post('/brand/sync', cors({ origin: true }), (req, res) => {
      brand.syncPic(req, res);
      });

      app.post('/slide/order', cors({ origin: true }), (req, res) => {
        brand.updateSlideOrder(req, res);
      });

      app.post('/slide/delete', cors({ origin: true }), (req, res) => {
        brand.deleteSlide(req, res);
      });

      app.get("/brand/delete/:brandId", cors({ origin: true }), brand.deleteBrandById);
  };
