const cors = require('cors')
module.exports = app => {
    const orders = require("../controllers/orders.controller");

    app.post('/order/create', cors({ origin: true }), (req, res) => {
      orders.createOrder(req, res);
    });

    // Retrieve a brand by brandId
    app.get("/orders/brand/:brandId", cors({ origin: true }), orders.getOrdersByBrandId);

     // Retrieve a brand by brandId
     app.get("/orders/user/:userId", cors({ origin: true }), orders.getOrdersByUserId);



    // Retrieve all Customers
    app.get("/brands", cors({ origin: true }), orders.getAll);

    app.post('/order/rzp/create', cors({ origin: true }), (req, res) => {
      orders.createRzpOrder(req, res);
    });

    app.post('/order/inner/create', cors({ origin: true }), (req, res) => {
      orders.createInnerOrder(req, res);
    });

    app.post('/order/update/status', cors({ origin: true }), (req, res) => {
      orders.updateOrderStatus(req, res);
    });

    // Retrieve a brand by brandId
    app.get("/order/meta-details/:orderId", cors({ origin: true }), orders.getOrderMeta);

    // Retrieve a brand by brandId
    app.get("/order/details/:userId", cors({ origin: true }), orders.getOrderUser);

    // Retrieve a brand by brandId
    app.get("/orders/summary/:brandId", cors({ origin: true }), orders.getOrderSummary);
  
  };
