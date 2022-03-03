const mysql=require('mysql');
const express=require('express');
const app=express();

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
        db.query('INSERT INTO users SET ?',{name:name,email:email,phone:phone,password:password},(err,results) => {
            if(err){
                throw err;
            }else{
                return res.render('signUp')
            }
        });

}
