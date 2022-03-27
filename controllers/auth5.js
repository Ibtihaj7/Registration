const mysql = require("mysql");
const express = require("express");
const codeComfirm = require('../controllers/auth3');
const app = express();

app.set("view engine", "hbs");
app.use(express.static("public"));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "sign_up",
});

exports.change = (req, res) => {
    const code = req.body.change;
    if(codeComfirm.code === code){
        return res.render('newPassword');
    }else{
        res.render('change',{
            message:"incorrect code"
        })

    }
}