const cors = require('cors')
module.exports = app => {
    const notfication = require("../controllers/notification.controller");
    // Create a new Customer
    // app.post("/customers", customers.create);
  
    // Retrieve all Customers
    app.get("/notifications", cors({ origin: true }), notfication.getAll);

    // Create new user
    app.post('/user/create', cors({ origin: true }), (req, res) => {
        // console.log('20novv /user/login => ', req.body)
        notfication.createUser(req, res);
    });

    // Create new user
    app.post('/user/register', cors({ origin: true }), (req, res) => {
        // console.log('20novv /user/login => ', req.body)
        notfication.registerUser(req, res);
    });

    // Create new Preference
    app.post('/user/login', cors({ origin: true }), (req, res) => {
        // console.log('20novv /user/login => ', req.body)
        notfication.userLogin(req, res);
    });

    // Get user details
    app.get("/user/:userToken", cors({ origin: true }), notfication.getUserDetails);

     // Logout
     app.get("/user/logout/:userToken", cors({ origin: true }), notfication.logoutUser);

     // Retrieve all users
    app.get("/users", cors({ origin: true }), notfication.getAllUsers);

    // Retrieve all users
    app.get("/users/mobile", cors({ origin: true }), notfication.getAllUsersMobile);

    // update user
    app.post('/user/update', cors({ origin: true }), (req, res) => {
        notfication.updateUser(req, res);
    });

    // update user
    app.post('/user/request-password', cors({ origin: true }), (req, res) => {
        notfication.requestPassword(req, res);
    });

    // Create new user
    app.post('/mail/send', cors({ origin: true }), (req, res) => {
        // console.log('20novv /user/login => ', req.body)
        notfication.sendMail(req, res);
    });

}