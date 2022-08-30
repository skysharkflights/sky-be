const Utils = function() { }

Utils.formatProductsResponse = (response) => {
    return new Promise((resolve, reject) => {
        const formattedResponse = [];
        let product = {};
        for(let item of response) {
            product = {};
            product.productId = response[0].productid;
            product.createdTimestamp = response[0].created_timestamp;
            product.description = response[0].description;
            product.galleryId = response[0].gallery_id;
            product.onSale = response[0].onsale;
            product.productName = response[0].product_name;
            product.productThumbImage = response[0].product_thumb_image;
            product.productType = response[0].product_type;
            product.salePrice = response[0].sale_price;
            product.sizes = response[0].sizes;
            product.sku = response[0].sku;
            product.status = response[0].status;
            product.stockAvailable = response[0].stock_available;
            product.totalSale = response[0].total_sale;
            product.unitPrice = response[0].unit_price;
            product.updatedTimestamp = response[0].updated_timestamp;
            product.collectionId = response[0].collection_id;
            product.discount = response[0].discount;
            product.isTrendingStyle = response[0].is_trending_style;
            product.onDiscount = response[0].on_discount;
            product.productCategory = response[0].product_category;
            product.productStyle = response[0].product_style;
            product.brandid = response[0].brand_id;
            product.preferenceid = response[0].preferenceid;
            product.alsoLikedProducts = [];
            product.brand = {};
            product.moreBrandProducts = [];
            product.colorsAvailable = [];
            product.productMeta = [];
            formattedResponse.push(product);
        }
        resolve(formattedResponse.reverse())
        
    }).catch((error) => {
        console.log('ERROR: ', error)
    })
}

// Utils.formatResponse = (rawResponse) => {
//     return new Promise((resolve, reject) => {
//         rawResponse[0]['test'] = 'this is formatted response';
//         console.log('22Jul rawResponse => ', typeof rawResponse[0], rawResponse.hasOwnProperty('test'))
//         resolve(rawResponse[0]);
//     }).catch((error) => {
//         console.log('22Jul error => ', error)
//     })
// }

module.exports = Utils