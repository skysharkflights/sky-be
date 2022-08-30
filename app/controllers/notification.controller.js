const Notification = require("../models/notification.model");
var async = require("async");

exports.getAll = (req, res) => {
    Notification.getAll((err, data) => {
        if (err){
            res.status(500).send({
             message:
               err.message || "Some error occurred while retrieving Brand. [getBrandById]"
           }); 
         } else {
            res.send(data);
         }
    })
}

exports.getAllUsers = (req, res) => {
    Notification.getAllUsers((err, data) => {
        if (err){
            res.status(500).send({
             message:
               err.message || "Some error occurred while retrieving Brand. [getBrandById]"
           }); 
         } else {
            res.send(data);
         }
    })
}

exports.getAllUsersMobile = (req, res) => {
    Notification.getAllUsersMobile((err, data) => {
        if (err){
            res.status(500).send({
             message:
               err.message || "Some error occurred while retrieving Brand. [getBrandById]"
           }); 
         } else {
            res.send(data);
         }
    })
}

exports.getUserDetails = (req, res) => {
    Notification.getUserDetails(req.params.userToken, (err, data) => {
        if (err){
            res.status(500).send({
             message:
               err.message || "Some error occurred while retrieving Brand. [getBrandById]"
           }); 
         } else {
            res.send(data);
         }
    })
}

exports.logoutUser = (req, res) => {
    Notification.logoutUser(req.params.userToken, (err, data) => {
        if (err){
            res.status(500).send({
             message:
               err.message || "Some error occurred while retrieving Brand. [getBrandById]"
           }); 
         } else {
            res.send(data);
         }
    })
}

exports.updateUser = (req, res) => {
    Notification.updateUser(req, (err, data) => {
        if (err){
            res.status(500).send({
             message:
               err.message || "Some error occurred while retrieving Brand. [getBrandById]"
           }); 
         } else {
            res.send(data);
         }
    })
}

exports.requestPassword = (req, res) => {
    Notification.requestPassword(req, (err, data) => {
        if (err){
            res.status(500).send({
             message:
               err.message || "Some error occurred while retrieving Brand. [getBrandById]"
           }); 
         } else {
            res.send(data);
         }
    })
}

exports.userLogin = (req, res) => {
    Notification.userLogin(req, (err, data) => {
        console.log('20noc data => ', data)
        if (err){
            res.status(500).send({
             message:
               err.message || "Some error occurred while retrieving Brand. [getBrandById]"
           }); 
         } else {
             if(data == null){
                console.log('20noc data null => ', data)
                res.status(403).send({
                    message: "Invalid email or password"
                  }); 
             } else {
                console.log('20noc data data => ', data)
                res.send(data);
             } 
         }
    })
}

exports.createUser = (req, res) => {
    Notification.createUser(req, (err, data) => {
        console.log('20noc data => ', data)
        if (err){
            res.status(500).send({
             message:
               err.message || "Some error occurred while retrieving Brand. [getBrandById]"
           }); 
         } else {
            res.send(data); 
         }
    })
}

exports.registerUser = (req, res) => {
    Notification.registerUser(req, (err, data) => {
        console.log('2s0noc data => ', data)
        if (err){
            res.status(500).send({
             message:
               err.message || "Some error occurred while retrieving Brand. [getBrandById]"
           }); 
         } else {
            res.send(data); 
         }
    })
}

exports.sendMail = (req, res) => {
    Notification.sendMail(req, (err, data) => {
        console.log('20noc data => ', data)
        if (err){
            res.status(500).send({
             message:
               err.message || "Some error occurred while retrieving Brand. [getBrandById]"
           }); 
         } else {
            res.send(data); 
         }
    })
}