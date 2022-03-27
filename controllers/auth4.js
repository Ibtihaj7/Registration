const mysql = require("mysql");
const express = require("express");
const randomize = require('randomatic');
const codeComfirm = require('../controllers/auht');
const { render } = require("ejs");
const app = express();

app.set("view engine", "hbs");
app.use(express.static("public"));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "sign_up",
});

exports.comfirm = (req, res) => {
    const code = req.body.code;
    if(code === codeComfirm.code){
        db.query('INSERT INTO users SET ?',{name:codeComfirm.name,email:codeComfirm.email,phone:codeComfirm.phone,password:codeComfirm.hashedPassword,confirmCode:randomize('0',6)},(err,results) => {
            if(err){
                throw err;
            }
        });
        res.render('logIn')
    }else{
        return res.render('comfirm',{
            message:'incorrect code'
        })
    }
}