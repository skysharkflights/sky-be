const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const db = require("./db.js");
const Json2csvParser = require('json2csv').Parser;
const fs = require('fs');
var path = require('path');

const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

//   // intercept OPTIONS method
//   if ('OPTIONS' == req.method) {
//     res.send(200);
//   }
//   else {
//     next();
//   }
// });
app.use(cors({
  origin: '*'
}));
require("./app/routes/product.routes.js")(app);
require("./app/routes/brand.routes.js")(app);
require("./app/routes/collections.routes.js")(app);
require("./app/routes/notification.routes.js")(app);
require("./app/routes/orders.routes.js")(app);
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Strill Backend" });
});

app.get('/export-users',function(req, res){
  db.query("SELECT * FROM user WHERE 1", function (err, user, fields) {
    if (err) throw err;
     
    const jsonUsers = JSON.parse(JSON.stringify(user));
 
    // -> Convert JSON to CSV data
    const csvFields = ['userid', 'name', 'username', 'email', 'gender', 'mobile'];
    const json2csvParser = new Json2csvParser({ csvFields });
    const csv = json2csvParser.parse(jsonUsers);
 
     res.setHeader("Content-Type", "text/csv");
     res.setHeader("Content-Disposition", "attachment; filename=users.csv");
 
     res.status(200).end(csv);
    // -> Check 'customer.csv' file in root project folder
  });
});

app.get('/export-brands',function(req, res){
  db.query("SELECT * FROM brand WHERE 1", function (err, brand, fields) {
    if (err) throw err;
     
    const jsonBrands = JSON.parse(JSON.stringify(brand));
 
    // -> Convert JSON to CSV data
    const csvFields = ['userid', 'name', 'username', 'email', 'gender', 'mobile'];
    const json2csvParser = new Json2csvParser({ csvFields });
    const csv = json2csvParser.parse(jsonBrands);
 
     res.setHeader("Content-Type", "text/csv");
     res.setHeader("Content-Disposition", "attachment; filename=brands.csv");
 
     res.status(200).end(csv);
    // -> Check 'customer.csv' file in root project folder
  });
});

app.get('/export-products',function(req, res){
  db.query("SELECT * FROM product WHERE 1", function (err, product, fields) {
    if (err) throw err;
     
    const jsonProducts = JSON.parse(JSON.stringify(product));
 
    // -> Convert JSON to CSV data
    const csvFields = ['userid', 'name', 'username', 'email', 'gender', 'mobile'];
    const json2csvParser = new Json2csvParser({ csvFields });
    const csv = json2csvParser.parse(jsonProducts);
 
     res.setHeader("Content-Type", "text/csv");
     res.setHeader("Content-Disposition", "attachment; filename=products.csv");
 
     res.status(200).end(csv);
    // -> Check 'customer.csv' file in root project folder
  });
});

app.get('/export-orders',function(req, res){
  db.query("SELECT * FROM orders WHERE 1", function (err, orders, fields) {
    if (err) throw err;
     
    const jsonOrders = JSON.parse(JSON.stringify(orders));
 
    // -> Convert JSON to CSV data
    const csvFields = ['userid', 'name', 'username', 'email', 'gender', 'mobile'];
    const json2csvParser = new Json2csvParser({ csvFields });
    const csv = json2csvParser.parse(jsonOrders);
 
     res.setHeader("Content-Type", "text/csv");
     res.setHeader("Content-Disposition", "attachment; filename=orders.csv");
 
     res.status(200).end(csv);
    // -> Check 'customer.csv' file in root project folder
  });
});

app.get('/export-collections',function(req, res){
  db.query("SELECT * FROM collection WHERE 1", function (err, collection, fields) {
    if (err) throw err;
     
    const jsonCollections = JSON.parse(JSON.stringify(collection));
 
    // -> Convert JSON to CSV data
    const csvFields = ['userid', 'name', 'username', 'email', 'gender', 'mobile'];
    const json2csvParser = new Json2csvParser({ csvFields });
    const csv = json2csvParser.parse(jsonCollections);
 
     res.setHeader("Content-Type", "text/csv");
     res.setHeader("Content-Disposition", "attachment; filename=collections.csv");
 
     res.status(200).end(csv);
    // -> Check 'customer.csv' file in root project folder
  });
});

// set port, listen for requests
app.listen(process.env.PORT || 5000, () => {
  console.log("Server is running on port 5000.");
});
