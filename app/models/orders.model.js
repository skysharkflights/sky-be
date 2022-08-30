// constructor
const sql = require("./db.js");
const Razorpay = require('razorpay')
const Orders = function(order) {

}

Orders.createInnerOrder = (params, result) => {
    console.log('params.query => ', params.body)

    sql.query(`INSERT INTO inner_orders VALUES (NULL, ${params.body.orderId}, ${params.body.productId}, '${params.body.productName}', '${params.body.productImage}', ${params.body.productQuantity}, '${params.body.productSize}', ${params.body.brandId}, '${params.body.brandName}', '${params.body.brandImage}', ${params.body.userId}, '${params.body.userName}', '${params.body.userMobile}', ${params.body.orderAmount}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, '${params.body.status}')`, (err, res) => {
        if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
        }
        res.status = res.affectedRows === 1 ? true : false;
        result(null, res);
    });
}

Orders.updateOrderStatus = (params, result) => {
    console.log('params.query => ', params.query)

    sql.query(`UPDATE inner_orders SET status = '${params.query.status}' WHERE id = ${params.query.id}`, (err, res) => {
        if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
        }
        res.status = res.affectedRows === 1 ? true : false;
        result(null, res);
    });
}

Orders.createOrder = (params, result) => {
    console.log('params.query => ', params.body)

    sql.query(`INSERT INTO orders VALUES (NULL, '${params.body.customerId}', '${params.body.paymentId}', ${params.body.orderTotal}, '${params.body.orderProducts}', '${params.body.orderQuantity}', '${params.body.orderBrands}', ${params.body.discountAmount}, '${params.body.couponApplied}', ${params.body.shippingAmount}, ${params.body.shippingAddressId}, ${params.body.billingAddressId}, ${params.body.isGift}, '${params.body.status}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, '${params.body.note}', '${params.body.recipientName}', '${params.body.recepientMobile}', '${params.body.rzpOrderId}', '${params.body.rzpOrderSignature}')`, (err, res) => {
        if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
        }
        res.status = res.affectedRows === 1 ? true : false;
        result(null, res);
    });
}

Orders.createRzpOrder = (params, result) => {
    let resp = null;
    let body = JSON.parse(JSON.stringify(params.body));

    // console.log('body.products stringify => ', JSON.parse(JSON.stringify(body.products)));
    // console.log('body.user stringify => ', JSON.parse(JSON.stringify(body.user)));
    // console.log('body.discount stringify => ', body.discount);
    // console.log('body.coupon stringify => ', body.coupon);

    // let products = JSON.parse(JSON.stringify(body.products));
    // let user = JSON.parse(JSON.stringify(body.user));
    // let discount = JSON.parse(JSON.stringify(body.discount));
    // let coupon = JSON.parse(JSON.stringify(body.coupon));

    var instance = new Razorpay({
        key_id: 'rzp_test_GiA0F1in2uA6Xv',
        key_secret: 'xQBla8ArOc6p0CWoUtZ0IhnI',
        receipt: "fdsf4354",
        headers: {
            "X-Razorpay-Account": "HIdIfu8N8XY2LU"
          }
    });
    instance.orders.create({
        amount: params.body.amount,
        currency: "INR",
        receipt: params.body.receipt,
        notes: {
            products: body.products,
            quantity: body.quantity,
            userName: body.userName,
            userEmail: body.userEmail,
            coupon: body.coupon
        }
      }).then((res) => {
        console.log("payment successfull  => ", res);
        result(null, res)
    }).catch(console.error('kuch fata gaya'))

    // instance.orders.all().then((res) => {
    //     result(null, res)
    // }).catch(console.error('kuch fata'))    
}


Orders.getAll = result => {
    sql.query("SELECT * FROM brand WHERE 1", (err, res) => {
        if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
        }
        
    
        result(null, res);
    });
};



Orders.getBrandById = (brandId, result) => {
    sql.query(`SELECT * FROM brand WHERE brand_id = ${brandId}`, (err, res) => {
        if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
        }
        result(null, res);
    });
}

Orders.getOrdersByBrandId = (orderId, result) => {
    sql.query(`SELECT * FROM inner_orders WHERE brand_id = ${orderId}`, (err, res) => {
        if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
        }
        result(null, res);
    });
}

Orders.getOrderMeta = (orderId, result) => {
    let userDetails = null;
    let address = null;
    sql.query(`SELECT * FROM orders WHERE id = ${orderId}`, (err, res) => {
        if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
        }
        
        if(res && res.length){
            console.log('getOrderMeta => ', res);
            const userId = res[0].customer_id;
            const shippingAddressId = res[0].shipping_address_id;
            const billingAddressId = res[0].billing_address_id;

            sql.query(`SELECT * FROM address WHERE id = ${shippingAddressId}`, (err2, res2) => {
                if (err2) {
                console.log("error: ", err2);
                address = null
                return;
                }
                address = res2;
                result(null, res2);
            });
            result(null, {
                user: userDetails,
                address: address
            });       
        }
    });
}

Orders.getOrderUser = (userId, result) => {
    sql.query(`SELECT * FROM user WHERE userid = ${userId}`, (err, res) => {
        if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
        }
        result(null, res);
    });
}

Orders.getOrdersByUserId = (userId, result) => {
    sql.query(`SELECT * FROM inner_orders WHERE user_id = ${userId}`, (err, res) => {
        if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
        }
        result(null, res);
    });
}

Orders.getOrderSummary = (brandId, result) => {
    console.log('brandid brandId ', brandId)
    const startDate = new Date(new Date().getTime() - 24*60*60*7000).toJSON().slice(0, 19).replace('T', ' ');
    const endDate = new Date().toJSON().slice(0, 19).replace('T', ' ');
    let queryString = `SELECT * FROM orders WHERE created_on >='2021-12-02 11:06:39' AND created_on <'${endDate}'`;
    // if(brandId != '0') {
    //     queryString = `SELECT * FROM orders WHERE created_on >='${startDate}' AND created_on <'${endDate}' AND order_brands =  '${brandId}'`;
    // }    
    sql.query(queryString, (err, res) => {
        if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
        }
        result(null, res);
    });
}

module.exports = Orders;