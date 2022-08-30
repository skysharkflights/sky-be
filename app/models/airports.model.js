// constructor
const sql = require("./db.js");
const utils = require('../utils/utils')
const AMADEUS_CONFIG = require("../config/amadeus.auth");
var Amadeus = require("amadeus");
var amadeus = new Amadeus({
  clientId: AMADEUS_CONFIG.CLIENT_ID,
  clientSecret: AMADEUS_CONFIG.CLIENT_SECRET
});
const Airports = function(product) {
    this.productid = Airports.productid;
    this.brand_id = Airports.brand_id;
    this.created_timestamp = Airports.created_timestamp;
    this.description = Airports.description;
    this.gallery_id = Airports.gallery_id;
    this.onsale = Airports.onsale;
    this.product_name = Airports.product_name;
    this.product_thumb_image = Airports.product_thumb_image;
    this.product_type = Airports.product_type;
    this.sale_price = Airports.sale_price;
    this.sizes = Airports.sizes;
    this.sku = Airports.sku;
    this.status = Airports.status;
    this.stock_available = Airports.stock_available;
    this.total_sale = Airports.total_sale;
    this.unit_price = Airports.unit_price;
    this.updated_timestamp = Airports.updated_timestamp;
    this.collection_id = Airports.collection_id;
    this.discount = Airports.discount;
    this.is_trending_style = Airports.is_trending_style;
    this.on_discount = Airports.on_discount;
    this.product_category = Airports.product_category;
    this.product_style = Airports.product_style;
    this.brandid = Airports.brandid;
    this.preferenceid = Airports.preferenceid;
};

Airports.getAll = result => {
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

  Airports.getProductByBrandId = (brandId, result) => {
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

  Airports.getProductById = (productId, result) => {
    sql.query(`SELECT * FROM product WHERE status = 1 AND productid = ${productId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if(res) {
        console.log('res 0=> ', res)
        Airports.getProductImages(productId).then((data) => {
          res[0]['images'] = data;
          console.log('res  1=> ', res[0]);
          result(null, res);
        })
        
      }
      
      // utils.formatProductsResponse(res).then((data) => {
      //     if(data.length) {
      //        Promise.all([
      //           Airports.getMoreProductsFromBrand([data[0].productId, data[0].brandid]),
      //           Airports.getAlsoLikeProducts(data[0].productCategory)
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

  Airports.getProductImages = (id) => {
    return new Promise((resolve, reject) => {
        Airports.getAllProductImages(id, (err, images) => {
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

  Airports.getAirports = (keyword, result) => {
    
    // What's the airline name for the IATA code BA?
    amadeus.referenceData.locations.get({
      keyword: keyword,
      subType: 'AIRPORT'
    }).then(function (response) {
      console.log("THEN => response", response);
      result(null, response);
    }).catch(function (error) {
      console.error("CATCH => response", error);
      result(null, error);
    });
    // sql.query(`SELECT * FROM product WHERE status = 1`, (err, res) => {
    //   if (err) {
    //     console.log("error: ", err);
    //     result(null, err);
    //     return;
    //   }
    //   result(null, res);
    //   // utils.formatProductsResponse(res).then((data) => {
    //   //   result(null, data);
    //   // })
    // });
  };

  Airports.flightSearch = (params, result) => {

    const body = JSON.stringify({
      "originDestinations": [
          {
              "id": "1",
              "originLocationCode": params.query.origin,
              "destinationLocationCode": params.query.destination,
              "departureDateTime": {
                  "date": params.query.date
              }
          }
      ],
      "travelers": [
          {
              "id": "1",
              "travelerType": "ADULT"
          }
      ],
      "sources": [
          "GDS"
      ]
    });

    amadeus.shopping.availability.flightAvailabilities.post(body).then(function (response) {
      console.log(response);
      result(null, response);
    }).catch(function (response) {
        console.error(response);
        result(null, response);
    });
}

Airports.flightPriceSearch = (params, result) => {
  // let travelers = [];
  // let travelerId = 1;
  // if(params.query.adultCount) {
  //   for(let i = 1; i <= parseInt(params.query.adultCount); i++) {
  //     travelers.push({
  //       "id": travelerId.toString(),
  //       "travelerType": "ADULT"
  //     }); 
  //   }
  //   travelerId = travelerId+1;
  // }
  // if(params.query.childCount) {
  //   for(let i = 1; i <= parseInt(params.query.adultCount); i++) {
  //     travelers.push({
  //       "id": travelerId.toString(),
  //       "travelerType": "CHILD"
  //     }); 
  //   }
  //   travelerId = travelerId+1;
  // }
  // if(params.query.infantCount) {
  //   for(let i = 1; i <= parseInt(params.query.adultCount); i++) {
  //     travelers.push({
  //       "id": travelerId.toString(),
  //       "travelerType": "INFANT"
  //     }); 
  //   }
  //   travelerId = travelerId+1;
  // }
  // travelerId = 0;
  console.log('flightClass => ', params.query)
  const body = JSON.stringify({
    "currencyCode": "USD",
    "originDestinations": [
        {
            "id": "1",
            "originLocationCode": params.query.origin,
            "destinationLocationCode": params.query.destination,
            "departureDateTimeRange": {
                "date": params.query.date,
                "time": "10:00:00"
            }
        }
    ],
    "travelers": [{
            "id": 1,
            "travelerType": "ADULT"
    }],
    "sources": [
        "GDS"
    ],
    "searchCriteria": {
      "maxFlightOffers": 100,
      "flightFilters": {
        "cabinRestrictions": [
          {
            "cabin": params.query.flightClass,
            "coverage": "MOST_SEGMENTS",
            "originDestinationIds": [
              "1"
            ]
          }
        ]
      }
    }
  });

  amadeus.shopping.flightOffersSearch.post(body).then(function (response) {
    // console.log(response);
    result(null, response);
  }).catch(function (response) {
      // console.error(response);
      result(null, response);
  });
}

Airports.getAirlineDetails = (airlineCode, result) => {

  amadeus.referenceData.airlines.get({
    airlineCodes: airlineCode
  }).then(function (response) {
    console.log(response);
    result(null, response);
  }).catch(function (response) {
    console.error(response);
    result(null, response);
  });
}

  Airports.getProductsOfSameBrand = (brandId, result) => {
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

  Airports.getProductMetaById = (productId, result) => {
    sql.query(`SELECT * FROM product_meta WHERE productid = ${productId} LIMIT 1`, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
        
        result(null, res);
      });
  }

  Airports.getRelatedBrandProducts = (row, result) => {
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

  Airports.getProductByCategory = (categoryId, result) => {
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

  Airports.getProductByPreference = (preferenceId, result) => {
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

  Airports.getAllProductImages = (productId, result) => {
    sql.query(`SELECT * FROM product_gallery WHERE product_id = ${productId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      result(null, res);
    });
  };

  Airports.getMoreProductsFromBrand = (ids) => {
    return new Promise((resolve, reject) => {
        Airports.getRelatedBrandProducts([ids[0], ids[1]], (err, brandProducts) => {
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

  Airports.getAlsoLikeProducts = (categoryId) => {
    return new Promise((resolve, reject) => {
        Airports.getProductByCategory(categoryId, (err, categoryProducts) => {
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

  Airports.createProduct = (params, result) => {
    sql.query(`INSERT INTO product VALUES (NULL,${params.query.brandId[0]},'${params.query.color}',CURRENT_TIMESTAMP,'${params.query.description}',0,'${params.query.onSale}','${params.query.name}','${params.query.productImage}',
      '${params.query.genderPreference}','${params.query.price}','${params.query.size}','${Math.random().toString(16).slice(2)}','${params.query.status}','Yes',0,'${params.query.price}',CURRENT_TIMESTAMP,0,'${params.query.discount}','${params.query.isHighlighted}',0,'${params.query.categoryId}','${params.query.genderPreference}','${params.query.brandId}','${params.query.preferenceId}')`, (err, res) => {
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

Airports.createCategory = (params, result) => {
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

Airports.updateCategory = (params, result) => {
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

Airports.deleteCategoryById = (params, result) => {
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

Airports.createPreference = (params, result) => {
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

Airports.createColor = (params, result) => {
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

Airports.updatePreference = (params, result) => {
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

Airports.deletePreferenceById = (params, result) => {
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

Airports.deleteColorById = (params, result) => {
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

Airports.uploadImages = (params, result) => {
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

Airports.getAllCategories = result => {
  sql.query("SELECT * FROM product_category WHERE 1", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

Airports.getAllColors = result => {
  sql.query("SELECT * FROM colors WHERE 1", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

Airports.getAllPreferences = result => {
  sql.query("SELECT * FROM preference WHERE status = 1", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

Airports.getCategoryById = (categoryId, result) => {
  sql.query(`SELECT * FROM product_category WHERE id = ${categoryId} LIMIT 1`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

Airports.getPreferenceyById = (preferenceId, result) => {
  sql.query(`SELECT * FROM preference WHERE preferenceid = ${preferenceId} LIMIT 1`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

module.exports = Airports;