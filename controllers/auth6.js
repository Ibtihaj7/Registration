const mysql = require("mysql");
const express = require("express");
const auth3 = require('../controllers/auth3')
const bcrypt = require('bcryptjs');
const regePassword = /^(?=(.*[a-zA-Z]){1,})(?=(.*[0-9]){2,}).{8,}$/;

const app = express();

app.set("view engine", "hbs");
app.use(express.static("public"));

exports.new = async(req, res) => {
  const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "sign_up",
  });
    const pass1 = req.body.pass1;
    const pass2 = req.body.pass2;
    if(pass1 != pass2){
      res.render('newPassword',{
        message:'passwords not match'
      })

    }else if(!(regePassword.test(pass1))){
      res.render('newPassword',{
        message:"Please enter a valid password, must include both lower and upper case charachter, at least one number or symbol,and at least 8 characters long"
      })

    }else if(pass1===pass2){
        let hashedPassword = await bcrypt.hash(pass1 , 8);
        db.query('UPDATE users SET password = ? WHERE email = ?',[hashedPassword,auth3.email],(error,results) => {
          if(error){
            throw error;
        }
        res.render('logIn',{
          message1:'Operation completed successfully, log in by new password'
        })

        })
      }
      
}