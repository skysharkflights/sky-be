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

Brand.getAllSlides = result => {
    sql.query("SELECT * FROM slides WHERE is_active = 1", (err, res) => {
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

Brand.deleteBrandById = (brandId, result) => {
    console.log('deleteBrandById brandId => ', brandId)
    
    sql.query(`DELETE FROM brand WHERE brand_id = ${brandId}`, (err, res) => {
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

Brand.createSlide = (params, result) => {
    console.log('params.query => ', params.query)

    sql.query(`INSERT INTO slides VALUES (NULL, '${params.query.img}', '${params.query.name}', '${params.query.brandAlias}', ${params.query.brandId}, CURRENT_TIMESTAMP, ${params.query.isActive}, 0)`, (err, res) => {
        if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
        }
        res.status = res.affectedRows === 1 ? true : false;
        if (res.status) {
            res.data = {
                id: params.query.brandId,
                srcUrl: params.query.img,
                thumbUrl: params.query.img,
                name: params.query.brandAlias,
                description: '',
                homeSlider: true,
                homeSliderOrder: 0,
                isFollowing: false
            }
        } else {
            res.data = null;
        }
        
        result(null, res);
    });
}

Brand.syncPic = (params, result) => {
    console.log('params = params => ', params.query)
    sql.query(`UPDATE users_dashboard SET user_pic = '${params.query.imageUrl}', brand_id = '${params.query.brand_id}', onboarding_complete = '${params.query.onboarding_complete}' WHERE ID = '${params.query.id}'`, (err, res) => {
        if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
        }
        
        result(null, res);
    });
}

Brand.updateSlideOrder = (params, result) => {
    sql.query(`UPDATE slides SET slide_order = ${params.query.order} WHERE id = ${params.query.id}`, (err, res) => {
        if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
        }
        
        result(null, res);
    });
}

Brand.deleteSlide = (params, result) => {
    sql.query(`DELETE FROM slides WHERE id = ${params.query.id}`, (err, res) => {
        if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
        }
        
        result(null, res);
    });
}

module.exports = Brand;