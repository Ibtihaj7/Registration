const mysql=require('mysql');
const bcrypt = require('bcryptjs');
const express=require('express');

const app=express();
const nodemailer=require('nodemailer');
const randomize = require('randomatic');
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

    exports.name = name;
    exports.email = email;
    exports.phone = phone;

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
                message:"Please enter a valid email address"
            });            
        }else if(!(regePassword.test(password))){
            return res.render('signUp',{
                message:"Please enter a valid password, must include both lower and upper case charachter, at least one number or symbol,and at least 8 characters long"
            });
        }else{
            let hashedPassword = await bcrypt.hash(password , 8);
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
         exports.hashedPassword = hashedPassword;
         return res.render('comfirm')
    }
    });
   
}