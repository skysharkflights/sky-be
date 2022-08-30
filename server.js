const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors')

const app = express();
require("./app/routes/airports.routes.js")(app);
require("./app/routes/brand.routes.js")(app);
require("./app/routes/collections.routes.js")(app);
require("./app/routes/notification.routes.js")(app);
// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({ origin: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to SkyShark Flights Backend" });
});



// set port, listen for requests
app.listen(process.env.PORT || 5000, () => {
  console.log("Server is running on port 5000.");
});
