const Orders = require("../models/orders.model");
var async = require("async");

exports.getAll = (req, res) => {
    Orders.getAll((err, data) => {
        if (err){
            res.status(500).send({
             message:
               err.message || "Some error occurred while retrieving Orders. [getBrandById]"
           });
         } else {
            res.send(data);
         }

    })
}

exports.getBrandById = (req, res) => {
    Orders.getBrandById(req.params.brandId, (err, data) => {
        if (err){
            res.status(500).send({
             message:
               err.message || "Some error occurred while retrieving Orders. [getBrandById]"
           }); 
         } else {
             if(data.length) {
                res.send({
                    alias: data[0].alias,
                    brandCoverPic: data[0].brand_cover_pic,
                    brandDetail: data[0].brand_detail,
                    brandId: data[0].brand_id,
                    brandImg: data[0].brand_img,
                    brandName: data[0].brand_name,
                    contactMail: data[0].contact_mail,
                    contactTel: data[0].contact_tel,
                    homeSlider: data[0].home_slider,
                    homeSliderOrder: data[0].home_slider_order,
                    isFollowing: data[0].isfollowing,
                });
             } else {
                 return {};
             }
            
         }
    })
}

exports.createOrder = (req, res) => {
    // console.log('29 sep => ', req)
    Orders.createOrder(req, (err, data) => {
        if (err){
            res.status(500).send({
             message:
               err.message || "Some error occurred while creating Orders. [getBrandById]"
           }); 
         } else {
            res.send(data);
         }
    })
}

exports.createInnerOrder = (req, res) => {
    // console.log('29 sep => ', req)
    Orders.createInnerOrder(req, (err, data) => {
        if (err){
            res.status(500).send({
             message:
               err.message || "Some error occurred while creating Orders. [getBrandById]"
           }); 
         } else {
            res.send(data);
         }
    })
}

exports.updateOrderStatus = (req, res) => {
    // console.log('29 sep => ', req)
    Orders.updateOrderStatus(req, (err, data) => {
        if (err){
            res.status(500).send({
             message:
               err.message || "Some error occurred while creating Orders. [getBrandById]"
           }); 
         } else {
            res.send(data);
         }
    })
}

exports.createRzpOrder = (req, res) => {
    // console.log('29 sep => ', req)
    Orders.createRzpOrder(req, (err, data) => {
        if (err){
            res.status(500).send({
             message:
               err.message || "Some error occurred while creating Orders. [getBrandById]"
           }); 
         } else {
            res.send(data);
         }
    })
}

exports.getOrdersByBrandId = (req, res) => {
    Orders.getOrdersByBrandId(req.params.brandId, (err, data) => {
        if (err){
            res.status(500).send({
             message:
               err.message || "Some error occurred while retrieving Orders. [getBrandById]"
           }); 
         } else {
             if(data.length) {
                res.send(data);;
             } else {
                res.send(data);
             }
         }
    })
}

exports.getOrderMeta = (req, res) => {
    Orders.getOrderMeta(req.params.orderId, (err, data) => {
        if (err){
            res.status(500).send({
             message:
               err.message || "Some error occurred while retrieving Orders. [getBrandById]"
           }); 
         } else {
             if(data.length) {
                res.send(data);;
             } else {
                res.send(data);
             }
            
         }
    })
}

exports.getOrderUser = (req, res) => {
    Orders.getOrderUser(req.params.userId, (err, data) => {
        if (err){
            res.status(500).send({
             message:
               err.message || "Some error occurred while retrieving Orders. [getBrandById]"
           }); 
         } else {
             if(data.length) {
                res.send(data);;
             } else {
                res.send(data);
             }
            
         }
    })
}

exports.getOrdersByUserId = (req, res) => {
    Orders.getOrdersByUserId(req.params.userId, (err, data) => {
        if (err){
            res.status(500).send({
             message:
               err.message || "Some error occurred while retrieving Orders. [getBrandById]"
           }); 
         } else {
             if(data.length) {
                res.send(data);;
             } else {
                res.send(data);
             }
            
         }
    })
}

exports.getOrderSummary = (req, res) => {
    Orders.getOrderSummary(req.params.brandId, (err, data) => {
        if (err){
            res.status(500).send({
             message:
               err.message || "Some error occurred while retrieving Orders. [getBrandById]"
           }); 
         } else {
             if(data.length) {
                res.send(data);
             } else {
                res.send(data);;
             }
            
         }
    })
}