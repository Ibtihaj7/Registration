const mysql = require("mysql");
const express = require("express");
const app = express();

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

    db.query("SELECT * FROM users WHERE email = ? ", [email], (error, results) => {
      if (error) {
        throw error;
      }
      if (results.length > 0) {
        return res.render("comfirm",{
            message:false
        });
      } else {
        return res.render("forget", {
          message: "the email address is not exist"
        });
      }
    })

}