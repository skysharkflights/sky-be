// constructor
const sql = require("./db.js");
var md5 = require('md5');
const nodemailer = require("nodemailer");
const { sendMail } = require("../controllers/notification.controller.js");
const e = require("cors");
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

Notfication.getUserDetails = (userToken, result) => {
    sql.query(`SELECT * FROM users_dashboard WHERE token = '${userToken}' LIMIT 1`, (err, res) => {
        if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
        }

        result(null, res);
    });
};

Notfication.logoutUser = (userToken, result) => {
    sql.query(`UPDATE users_dashboard SET token = null WHERE token = '${userToken}'`, (err, res) => {
        if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
        }

        result(null, res);
    });
};

Notfication.userLogin = (params, result)  => {
    sql.query(`SELECT * FROM users_dashboard WHERE user_email = '${params.body.email}' AND user_status = 'ACTIVE' LIMIT 1`, (err, res) => {
        if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
        }
        const TokenGenerator = require( 'token-generator' )({
            salt: 'KJ7as57JJdas340sHGsdaskd65JKGFHjsa89',
            timestampMap: 'TIMESTAMPX', // 10 chars array for obfuscation proposes
        });
        const token = TokenGenerator.generate()
        if(res.length) {
            sql.query(`UPDATE users_dashboard SET token =  '${token}' WHERE user_email = '${params.body.email}' LIMIT 1`, (err, res) => {
            });
            // res[0]['data'] = {};
            let returnPayload = {}
            returnPayload['data'] = res[0];
            returnPayload['data']['token'] = token;
            // res[0]['data'] = res[0];
            if(res[0].user_pass === md5(params.body.password)) {
                
                console.log('20nov res => ', res);
                result(null, returnPayload);
            } else {
                console.log('20nov else => ', res);
                result(null, null);
            }
        } else {
            console.log('20nov else else => ', res);
            result(null, null);
        }
    });
};

Notfication.createUser = (params, result)  => {
    const PasswordGenerator = require( 'token-generator' )({
        salt: 'KJ7as57JJdas340sHGsdaskd65JKGFHjsa89',
        timestampMap: 'TIMESTAMPX', // 10 chars array for obfuscation proposes
    });
    const password = PasswordGenerator.generate();
    sql.query(`INSERT INTO users_dashboard VALUES (NULL,'${params.query.email}',MD5('${password}'),'Male','${params.query.email}','2008-7-04',CURRENT_TIMESTAMP, '${params.query.mobile}', 'NEW','${params.query.name}', '0','','','${params.query.role}',0,0)`, (err, res) => {
        if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
        }
        res['data'] = params.query;
        result(null, res);
    });
};

Notfication.registerUser = (params, result)  => {
    const TokenGenerator = require( 'token-generator' )({
        salt: 'KJ7as57JJdas340sHGsdaskd65JKGFHjsa89',
        timestampMap: 'TIMESTAMPX', // 10 chars array for obfuscation proposes
    });
    const token = TokenGenerator.generate()
    sql.query(`INSERT INTO users_dashboard VALUES (NULL,'${params.body.email}',MD5('${params.body.password}'),'Male','${params.body.email}','2008-7-04',CURRENT_TIMESTAMP, '', 'NEW','${params.body.fullName}', '0','','','BRAND',0,'0')`, (err, res) => {
        if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
        }
        // res['data'] = params.body;
        let returnPayload = {}
        returnPayload['data'] = res;
        returnPayload['data']['token'] = token;
        sendMailNow({to: params.body.email, subject: 'Registration Successful!',passwordRequest: false, password: null})
        result(null, returnPayload);
    });
};

Notfication.requestPassword = (params, result)  => {
    const PasswordGenerator = require( 'token-generator' )({
        salt: 'KJ7as57JJdas340sHGsdaskd65JKGFHjsa89',
        timestampMap: 'TIMESTAMPX', // 10 chars array for obfuscation proposes
    });
    const password = PasswordGenerator.generate();
    sql.query(`UPDATE users_dashboard SET user_pass = MD5('${password}') WHERE user_email = '${params.body.email}' LIMIT 1`, (err, res) => {
        if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
        }
        // res['data'] = params.body;
        let returnPayload = {}
        returnPayload['data'] = res;
        sendMailNow({to: params.body.email, subject: 'New Password Generated!', passwordRequest: true, password: password})
        result(null, returnPayload);
    });
};

Notfication.sendMail = (params, result)  => {
    
    sendMailNow(params.query).catch(console.error);
        result(true, null)

};

async function sendMailNow(params) {
    let transporter = nodemailer.createTransport({
        host: "smtp.dreamhost.com",
        port: 465,
        secure: false, // true for 465, false for other ports
        auth: {
          user: 'notifications@medzzy.com', // generated ethereal user
          pass: 'SendMail@787', // generated ethereal password
        },
        secure: true
      });
      let html = '';
      if(!params.passwordRequest){
        html = `
        <div>
          <p><b>Hello from Strill</b> 👋</p>
          <p>
            Congrats! Your <b>account</b> on Strill is created.
          </p>
          <p>
            Our team will approve it at lightning speed, meanwhile sit back tight and relax. We shall notify you as soon as your account is approved.
          </p>
          <p>
            Once your account is approved, you may visit <a href="http://localhost:4200/app-pages/brand/onboarding" style="color: #75B748">Strill Dashboard</a> to complete your onboarding process.
          </p>
          <p>Regards</p>
          <p><i>Strill</i></p>
        </div>
      `
      } else {
        html = `
        <div>
          <p><b>Hello from Strill</b> 👋</p>
          <p>
            Here's your new password for Strill:
          </p>
          <p><b>${params.password}</b></p>
          <p>Please be advised to not share it with anyone, not even with us because no one from Strill would ever ask you for same.</p>
          <p>Regards</p>
          <p><i>Strill</i></p>
        </div>
      `
      }

      // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"Strill" <no-reply@strill.com>', // sender address
            to: `${params.to}`, // list of receivers
            subject: `${params.subject}`, // Subject line
            // text: `${params.text}`, // plain text body
            html: html, // html body
        })

        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

Notfication.getAllUsers = result => {
    sql.query("SELECT * FROM users_dashboard WHERE 1", (err, res) => {
        if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
        }
        
    
        result(null, res);
    });
};

Notfication.getAllUsersMobile = result => {
    sql.query("SELECT * FROM user WHERE 1", (err, res) => {
        if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
        }
        
    
        result(null, res);
    });
};

Notfication.updateUser = (params, result) => {
    let action = null;
    if(params.query.action === 'activate'){
        action = 'ACTIVE';
    } else if (params.query.action === 'deactivate'){
        action = 'INACTIVE';
    } else if (params.query.action === 'delete'){
        action = 'DELETED';
    } else {

    }
    console.log('action => ', action)
    if(action){
        sql.query(`UPDATE users_dashboard SET user_status = '${action}' WHERE ID = '${params.query.id}'`, (err, res) => {
            if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
            }
    
            result(null, res);
        });
    } else {
        result(null, null);
    }
    
};

module.exports = Notfication;