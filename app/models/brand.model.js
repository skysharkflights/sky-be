// constructor
const sql = require("./db.js");

const Brand = function(brand) {

}

Brand.getAll = result => {
    sql.query("SELECT * FROM brand WHERE 1", (err, res) => {
        if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
        }
        
    
        result(null, res);
    });
};

Brand.getBrandById = (brandId, result) => {
    sql.query(`SELECT * FROM brand WHERE brand_id = ${brandId}`, (err, res) => {
        if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
        }
        result(null, res);
    });
}

Brand.createBrand = (params, result) => {
    console.log('params.query => ', params.query)

    // INSERT INTO brand VALUES (NULL,'https://source.unsplash.com/433x649/?Uruguay', 'Hrssssx', 0, 0, 'If you are adding values for all the columns of the table, you do not need to specify the column names in the SQL query. However, make sure the order of the values is in the same order as the columns', NULL);

    // INSERT INTO product VALUES (NULL,'${params.query.imageUrl}');

    sql.query(`INSERT INTO brand VALUES (NULL, '${params.query.imageUrl}', '${params.query.name}', ${params.query.homeSlider}, ${params.query.sliderOrder}, '${params.query.description}', ${params.query.isFolowing}, '${params.query.alias}', '${params.query.contact_mail}', '${params.query.contact_tel}', '${params.query.brand_cover_pic}')`, (err, res) => {
        if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
        }
        res.status = res.affectedRows === 1 ? true : false;
        if (res.status) {
            res.data = {
                id: res.insertId,
                imageUrl: params.query.imageUrl,
                name: params.query.name,
                homeSlider: params.query.homeSlider,
                sliderOrder: params.query.sliderOrder,
                description: params.query.description,
                isFolowing: params.query.isFolowing,
                alias: params.query.alias,
                contact_mail: params.query.contact_mail,
                contact_tel: params.query.contact_tel,
                brand_cover_pic: params.query.brand_cover_pic,
            }
        } else {
            res.data = null;
        }
        
        result(null, res);
    });
}

module.exports = Brand;