const express = require('express');
const mysql = require('mysql');
const server = express();
server.set("view engine","hbs");
server.use(express.static('public'));
let db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'sign_up'
   
})
module.login = (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    db.query('select email,password where email = ? and password = ?',[email,password],(err,res)=>{
        if(err)
        throw err;
        if(res.length){
     server.render('home');
        }
    })
}