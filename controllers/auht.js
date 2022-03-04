const mysql=require('mysql');
const express=require('express');
const app=express();

const bcrypt = require('bcryptjs');

app.set('view engine','hbs');
app.use(express.static('public'));

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'sign_up'
})

exports.register = (req,res) => {
    console.log(req.body);

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
            return res.render('signUp',
            {
                message:"you muast fill all the featuer"
            })
        }
        let hashedPassword = await bcrypt.hash(password , 8);
        db.query('INSERT INTO users SET ?',{name:name,email:email,phone:phone,password:hashedPassword},(err,results) => {
            if(err){
                throw err;
            }else{
                return res.render('home')
            }
        });
    });

}
