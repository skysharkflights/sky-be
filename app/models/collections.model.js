// constructor
const sql = require("./db.js");
const utils = require('../utils/utils')
var async = require('async');

const Collection = function(collection) {};

Collection.getCollections = result => {
    sql.query("SELECT * FROM collection WHERE 1", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      utils.formatProductsResponse(res).then((data) => {
        result(null, data);
      })
    
    //   result(null, res);
    });
  };

  Collection.getHighlightImagesByBrand = (brandId, result) => {

    sql.query(`SELECT * FROM brand_highlight_images WHERE brandid = ${brandId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if(res) {
        result(null, res);        
      }
    });
  };

  Collection.getCollectionsByBrandId = (brandId, result) => {

    sql.query(`SELECT * FROM collection WHERE brandid = ${brandId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if(res) {
        let promises = [];

        for(let collection in res){
          promises.push(new Promise((resolve, reject) => {
            sql.query(`SELECT * FROM collection_meta WHERE collectionid = ${res[collection].collectionid}`, (errIn, resIn) => {
              if (errIn) {
                console.log("error: ", errIn);
                res[collection]['products'] = errIn;
                resolve(true)
                return;
              }
              if(resIn) {
                console.log("resIn: ", resIn);
                res[collection]['products'] = resIn;
                resolve(true)
              }
            })
          }))
        }
        Promise.all(promises).then((values) => {
          result(null, res);
        });
        
      }
    });
  };

  Collection.getCollectionProducts = (collectionId) => {
    return new Promise((resolve) => {
      sql.query(`SELECT * FROM collection_meta WHERE collectionid = ${collectionId}`, (err, res) => {
        if (err) {
          console.log("error: ", err);
          // result(null, err);
          resolve(err)
          return;
        }
        if(res) {
          // result(null, res);
          resolve(res)
        }
      });
    })
    
  };

  Collection.getCollectionsByUserId = (userId, result) => {
    sql.query(`SELECT * FROM product WHERE userid = ${userId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if(res) {
        result(null, res);
      }
    });
  };

// Collection.createCollection = (params, result) => {
//   console.log(params)

//   sql.query(`INSERT INTO collection VALUES (NULL,${params.query.brandId},'${params.query.description}','${params.query.image}','${params.query.name}','${params.query.thumbImage}','${params.query.gender}',1, null, 0, 'BRAND','${params.query.brandName}' )`, (err, res) => {
//       if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//       }
//       res.status = res.affectedRows === 1 ? true : false;
//       if (res.status) {
//           res.data = params.query;
//       } else {
//           res.data = null;
//       }
//       result(null, res);
//   });
// }

Collection.addCollectionProducts = (params, result) => {
  let ids = params.query.productIds.split('|');
  let values = `(`
  ids.forEach((id, index) => {
    values = values + `NULL,${params.query.collectionId},${id})`
    if(index !== ids.length-1) {
      values = values + ',('
    }
  })
  sql.query(`INSERT INTO collection_meta VALUES ${values}`, (err, res) => {
      if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
      }
      res.status = res.affectedRows === 1 ? true : false;
      if (res.status) {
          res.data = params.query
      } else {
          res.data = null;
      }
      
      result(null, res);
  });
}

Collection.updateCollection = (params, result) => {
  console.log(params)
  sql.query(`UPDATE product_category SET category_name = '${params.query.name}', category_detail = '${params.query.details}', category_image = '${params.query.image}' WHERE id = ${params.query.id}`, (err, res) => {
      if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
      }
      res.status = res.affectedRows === 1 ? true : false;
      if (res.status) {
          res.data = params.query;
      } else {
          res.data = null;
      }
      result(null, res);
  });
}

Collection.deleteCollectionById = (params, result) => {
  console.log(params)
  sql.query(`DELETE FROM product_category WHERE id = ${params.query.id}`, (err, res) => {
      if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
      }
      res.status = res.affectedRows === 1 ? true : false;
      if (res.status) {
          res.data = params.query;
      } else {
          res.data = null;
      }
      result(null, res);
  });
}

Collection.createHighlight = (params, result) => {
  console.log(params)
  sql.query(`INSERT INTO brand_highlight_images VALUES (NULL,'${params.query.image}','${params.query.linkType}',${params.query.collectionId ? params.query.collectionId : 0},'${params.query.brandName ? params.query.brandName : null }',${params.query.brandId ? params.query.brandId : 0})`, (err, res) => {
      if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
      }
      res.status = res.affectedRows === 1 ? true : false;
      if (res.status) {
          res.data = params.query;
      } else {
          res.data = null;
      }
      result(null, res);
  });
}



Collection.updateCollection = (params, result) => {
  console.log(params)
  sql.query(`UPDATE preference SET gender = '${params.query.gender}', preference_img = '${params.query.image}', preference_title = '${params.query.title}', status = '${params.query.status}' WHERE preferenceid = ${params.query.id}`, (err, res) => {
      if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
      }
      res.status = res.affectedRows === 1 ? true : false;
      if (res.status) {
          res.data = params.query;
      } else {
          res.data = null;
      }
      result(null, res);
  });
}



Collection.uploadImages = (params, result) => {
  let images = params.query.images.split('|');
  let values = `(`
  images.forEach((image, index) => {
    values = values + `NULL,${params.query.colorId},0,'${image}',${params.query.productId})`
    if(index !== images.length-1) {
      values = values + ',('
    }
  })
  sql.query(`INSERT INTO product_gallery VALUES ${values}`, (err, res) => {
      if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
      }
      res.status = res.affectedRows === 1 ? true : false;
      if (res.status) {
          res.data = params.query
      } else {
          res.data = null;
      }
      
      result(null, res);
  });
}

module.exports = Collection;