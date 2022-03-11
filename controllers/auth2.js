const mysql = require("mysql");
const express = require("express");
const bcrypt = require('bcryptjs');
const app = express();

app.set("view engine", "hbs");
app.use(express.static("public"));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "sign_up",
});

exports.register = (req, res) => {
//   console.log(req.body);

  const email = req.body.email;
  const password = req.body.password;
  db.query("SELECT * FROM users WHERE email = ? ", [email], (error, results) => {
      if (error) {
        throw error;
      }
      if (results.length  && bcrypt.compareSync(password,results[0].password)) {
        return res.render("home",{
            message:false
        });
      } else {
        return res.render("logIn", {
          message: "password or email is incorrect"
        });
      }
    }
  );
};
