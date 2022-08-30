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