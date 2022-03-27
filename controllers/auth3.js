const mysql = require("mysql");
const express = require("express");
const app = express();
const randomize = require('randomatic');
const nodemailer=require('nodemailer');

app.set("view engine", "hbs");
app.use(express.static("public"));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "sign_up",
});

exports.forget = (req, res) => {
    const email = req.body.email;
    exports.email = email;

    db.query("SELECT * FROM users WHERE email = ? ", [email], (error, results) => {
      if (error) {
        throw error;
      }
      if (results.length > 0) {
        let code = randomize('0',6);
            let transporter = nodemailer.createTransport({
           service : "gmail",
           auth: {
             user: 'unstoppableteam826@gmail.com', 
             pass: '123123unstoppableteam826', 
           },
         });
       
         transporter.sendMail({
           from: "unstoppableteam826@gmail.com",
           to: req.body.email, 
           subject: "Email code confirmation",
           text: `${code}`,
         })
         exports.code = code;
        return res.render("changePas",{
            message:false
        });

      } else {
        return res.render("forget", {
          message: "the email address is not exist"
        });
      }
    })

}