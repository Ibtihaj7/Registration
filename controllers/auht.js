const mysql=require('mysql');
// const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const express=require('express');
// const Connection = require('mysql/lib/Connection');
const app=express();

const regeEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
const regePassword = /^(?=(.*[a-zA-Z]){1,})(?=(.*[0-9]){2,}).{8,}$/;


app.set('view engine','hbs');
app.use(express.static('public'));

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'sign_up'
})

exports.register = (req,res) => {
    // console.log(req.body);

    const name=req.body.name;
    const email=req.body.email;
    const phone=req.body.phone;
    const password=req.body.password;
    const repassword=req.body.repassword;


    db.query('SELECT email FROM users WHERE email = ?',[email],async(error,results) => {
        if(error){
            throw error;
        }
        if(results.length  > 0 ){
            return res.render('signUp',{
                message:"the email is already used"
            });
        }else if(password!== repassword){
            return res.render('signUp',{
                message:"Password and comfirm password do not match"
            });
        }else if(name===""||email===""||phone==="" ||password===""){
            return res.render('signUp',{
                message:"you muast fill all the featuer"
            });
        }else if(!(regeEmail.test(email))){
            return res.render('signUp',{
                message:"invalid Email"
            });            
        }else if(!(regePassword.test(password))){
            return res.render('signUp',{
                message:"invalid password"
            });
        }else{
        let hashedPassword = await bcrypt.hash(password , 8);
        db.query('INSERT INTO users SET ?',{name:name,email:email,phone:phone,password:hashedPassword},(err,results) => {
            if(err){
                throw err;
            }else{
                return res.render('comfirm',{
                    notDone:true
                })
            }
        });
    }
    });
}
