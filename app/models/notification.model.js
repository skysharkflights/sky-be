// constructor
const sql = require("./db.js");

const Notfication = function() {

}

Notfication.getAll = result => {
    sql.query("SELECT * FROM notification WHERE active = 1", (err, res) => {
        if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
        }
        
    
        result(null, res);
    });
};

module.exports = Notfication;