const express = require("express");
const mysql = require("mysql");
const bcrypt = require("bcryptjs");
const app = express();

app.set("view engine", "hbs");
app.use(express.static("public"));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "sign_up",
});
exports.login = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  db.query( "select * From users where email = ? and password = ?",[email, password],(err, res) => {
      if (err) throw err;
      if (results.length && bcrypt.compareSync(password, results[0].password)) {
        return res.render("home");
      } else {
        return res.render("logIn", {
          message: "password or email is incorrect",
        });
      }
    }
  );
};
