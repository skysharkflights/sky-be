const cors = require('cors')
module.exports = app => {
    const notfication = require("../controllers/notification.controller");
  
    // Create a new Customer
    // app.post("/customers", customers.create);
  
    // Retrieve all Customers
    app.get("/notifications", cors({ origin: true }), notfication.getAll);

}