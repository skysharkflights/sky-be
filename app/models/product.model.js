// constructor
const sql = require("./db.js");
const utils = require('../utils/utils')

const Product = function(product) {
    this.productid = product.productid;
    this.brand_id = product.brand_id;
    this.created_timestamp = product.created_timestamp;
    this.description = product.description;
    this.gallery_id = product.gallery_id;
    this.onsale = product.onsale;
    this.product_name = product.product_name;
    this.product_thumb_image = product.product_thumb_image;
    this.product_type = product.product_type;
    this.sale_price = product.sale_price;
    this.sizes = product.sizes;
    this.sku = product.sku;
    this.status = product.status;
    this.stock_available = product.stock_available;
    this.total_sale = product.total_sale;
    this.unit_price = product.unit_price;
    this.updated_timestamp = product.updated_timestamp;
    this.collection_id = product.collection_id;
    this.discount = product.discount;
    this.is_trending_style = product.is_trending_style;
    this.on_discount = product.on_discount;
    this.product_category = product.product_category;
    this.product_style = product.product_style;
    this.brandid = product.brandid;
    this.preferenceid = product.preferenceid;
};

Product.getAll = result => {
    sql.query("SELECT * FROM product WHERE status = 1", (err, res) => {
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

  Product.getProductByBrandId = (brandId, result) => {
    sql.query(`SELECT * FROM product WHERE status = 1 AND brand_id = ${brandId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if(res) {
        console.log('res 0=> ', res)
        result(null, res);
      }
    });
  };

  Product.getProductById = (productId, result) => {
    sql.query(`SELECT * FROM product WHERE status = 1 AND productid = ${productId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if(res) {
        console.log('res 0=> ', res)
        Product.getProductImages(productId).then((data) => {
          res[0]['images'] = data;
          console.log('res  1=> ', res[0]);
          result(null, res);
        })
        
      }
      
      // utils.formatProductsResponse(res).then((data) => {
      //     if(data.length) {
      //        Promise.all([
      //           Product.getMoreProductsFromBrand([data[0].productId, data[0].brandid]),
      //           Product.getAlsoLikeProducts(data[0].productCategory)
      //        ]).then((values) => {
      //           console.log(values);
      //           data[0].moreBrandProducts = values[0];
      //           data[0].alsoLikedProducts = values[1];
      //           result(null, data[0]);
      //        });
      //     }
      //     else {
      //         result(null, null);
      //     }
          
      // })
    });
  };

  Product.getProductImages = (id) => {
    return new Promise((resolve, reject) => {
        Product.getAllProductImages(id, (err, images) => {
            if (err){
                console.log("Error: ", err);
                reject([]);
             } else {
                resolve(images)
             }
        })
    }).catch((error) => {
        reject(error);
    })
  }

  Product.getProducts = (result) => {
    sql.query(`SELECT * FROM product WHERE status = 1`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      result(null, res);
      // utils.formatProductsResponse(res).then((data) => {
      //   result(null, data);
      // })
    });
  };

  Product.getProductsOfSameBrand = (brandId, result) => {
    sql.query(`SELECT * FROM product WHERE status = 1 AND brand_id = ${brandId} LIMIT 6`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
    
      utils.formatProductsResponse(res).then((data) => {
        result(null, data);
      })
    });
  };

  Product.getProductMetaById = (productId, result) => {
    sql.query(`SELECT * FROM product_meta WHERE productid = ${productId} LIMIT 1`, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
        
        result(null, res);
      });
  }

  Product.getRelatedBrandProducts = (row, result) => {
    sql.query(`SELECT * FROM product WHERE productid != ${row[0]} AND brandid = ${row[1]} LIMIT 5`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      utils.formatProductsResponse(res).then((data) => {
        result(null, data);
      })
    });
  };

  Product.getProductByCategory = (categoryId, result) => {
    sql.query(`SELECT * FROM product WHERE product_category = ${categoryId} AND status = 1 LIMIT 6`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      utils.formatProductsResponse(res).then((data) => {
        result(null, data);
      })
    });
  };

  Product.getProductByPreference = (preferenceId, result) => {
    sql.query(`SELECT * FROM product WHERE preferenceid = ${preferenceId} AND status = 1 LIMIT 6`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      utils.formatProductsResponse(res).then((data) => {
        result(null, data);
      })
    });
  };

  /* Helper Functions */

  Product.getAllProductImages = (productId, result) => {
    sql.query(`SELECT * FROM product_gallery WHERE product_id = ${productId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      result(null, res);
    });
  };

  Product.getMoreProductsFromBrand = (ids) => {
    return new Promise((resolve, reject) => {
        Product.getRelatedBrandProducts([ids[0], ids[1]], (err, brandProducts) => {
            if (err){
                console.log("Error: ", err);
                resolve([]);
             } else {
                resolve(brandProducts)
             }
        })
    }).catch((error) => {
        resolve([]);
    })
  }

  Product.getAlsoLikeProducts = (categoryId) => {
    return new Promise((resolve, reject) => {
        Product.getProductByCategory(categoryId, (err, categoryProducts) => {
            if (err){
                console.log("Error: ", err);
                resolve([]);
             } else {
                resolve(categoryProducts)
             }
        })
    }).catch((error) => {
        reject([]);
    })
  }

  Product.createProduct = (params, result) => {
    sql.query(`INSERT INTO product VALUES (NULL,${params.query.brandId[0]},'${params.query.color}',CURRENT_TIMESTAMP,'${params.query.description}',0,'${params.query.onSale}','${params.query.name}','${params.query.productImage}','${params.query.genderPreference}','${params.query.price}','${params.query.size}','${Math.random().toString(16).slice(2)}','${params.query.status}','Yes',0,'${params.query.price}',CURRENT_TIMESTAMP,0,'${params.query.discount}','${params.query.isHighlighted}',0,'${params.query.categoryId}','${params.query.genderPreference}','${params.query.brandId}','${params.query.preferenceId}')`, (err, res) => {
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

Product.createCategory = (params, result) => {
  console.log(params)
  sql.query(`INSERT INTO product_category VALUES (NULL,'${params.query.name}','${params.query.details}','${params.query.image}')`, (err, res) => {
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

Product.updateCategory = (params, result) => {
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

Product.deleteCategoryById = (params, result) => {
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

Product.createPreference = (params, result) => {
  console.log(params)
  sql.query(`INSERT INTO preference VALUES (NULL,'${params.query.gender}','${params.query.image}','${params.query.title}','${params.query.status}')`, (err, res) => {
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

Product.createColor = (params, result) => {
  console.log(params)
  sql.query(`INSERT INTO colors VALUES (NULL,'${params.query.name}','${params.query.hexName}','${params.query.name}')`, (err, res) => {
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

Product.updatePreference = (params, result) => {
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

Product.deletePreferenceById = (params, result) => {
  console.log(params)
  sql.query(`DELETE FROM preference WHERE preferenceid = ${params.query.id}`, (err, res) => {
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

Product.deleteColorById = (params, result) => {
  console.log(params)
  sql.query(`DELETE FROM colors WHERE id = ${params.query.id}`, (err, res) => {
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

Product.uploadImages = (params, result) => {
  let images = params.query.images.split('$');
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

Product.getAllCategories = result => {
  sql.query("SELECT * FROM product_category WHERE 1", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

Product.getAllColors = result => {
  sql.query("SELECT * FROM colors WHERE 1", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

Product.getAllPreferences = result => {
  sql.query("SELECT * FROM preference WHERE status = 1", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

Product.getCategoryById = (categoryId, result) => {
  sql.query(`SELECT * FROM product_category WHERE id = ${categoryId} LIMIT 1`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

Product.getPreferenceyById = (preferenceId, result) => {
  sql.query(`SELECT * FROM preference WHERE preferenceid = ${preferenceId} LIMIT 1`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

Product.createCollection = (params, result) => {
  console.log(params)

  sql.query(`INSERT INTO collection VALUES (NULL,${params.query.brandId},'${params.query.description}','${params.query.image}','${params.query.name}','${params.query.thumbImage}','${params.query.gender}',1, CURRENT_TIMESTAMP, 0, 'BRAND','${params.query.brandName}' )`, (err, res) => {
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

Product.applyCoupon = (coupon, result) => {
  console.log(coupon)

  sql.query(`SELECT * FROM coupons WHERE coupon_code = '${coupon}' LIMIT 1`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
}

Product.getCoupons = (params, result) => {
  console.log(params)
  let brand_query = '';
  const by = params.query.owner === 'admin' ? 'created_by_admin' : 'created_by_brand';
  const brandId = params.query.brandId;
  if(params.query.owner === 'brand') {
    brand_query = `AND brand_id = ${brandId}`;
  }
  
  sql.query(`SELECT * FROM coupons WHERE ${by} = 1 AND active = 1 AND expiring_on >= NOW() ${brand_query}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
}

Product.createCoupon = (params, result) => {
  console.log(params)
  sql.query(`INSERT INTO coupons VALUES (NULL,'${params.query.couponCode}','${params.query.couponDescription}',${params.query.createdByBrand},${params.query.brandId},'${params.query.brandName}',${params.query.createdByAdmin},${params.query.active},'${params.query.expiringOn}',${params.query.discountAmount},${params.query.discountPercent})`, (err, res) => {
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

Product.getUserCollectionsById = (userId, result) => {
  console.log(userId)

  sql.query(`SELECT collection_meta.productid FROM collection INNER JOIN collection_meta ON collection_meta.collectionid = collection.collectionid WHERE collection.userid = ${userId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
}

module.exports = Product;