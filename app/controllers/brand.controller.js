const Brand = require("../models/brand.model");
var async = require("async");

exports.getAll = (req, res) => {
    Brand.getAll((err, data) => {
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

exports.getBrandById = (req, res) => {
    Brand.getBrandById(req.params.brandId, (err, data) => {
        if (err){
            res.status(500).send({
             message:
               err.message || "Some error occurred while retrieving Brand. [getBrandById]"
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

exports.createBrand = (req, res) => {
    // console.log('29 sep => ', req)
    Brand.createBrand(req, (err, data) => {
        if (err){
            res.status(500).send({
             message:
               err.message || "Some error occurred while creating Brand. [getBrandById]"
           }); 
         } else {
            res.send(data);
         }
    })
}