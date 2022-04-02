const express=require('express');
const path = require('path');
const mysql=require('mysql');

const app=express();
app.set('view engine','hbs');

let db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'sign_up'
   
})
const publicDirectory = path.join(__dirname,'./public');
app.use(express.static(publicDirectory));

app.use(express.urlencoded({extended:false }));

db.connect((err)=>{
    if(err){
        throw err;
    }else{
        console.log('connected');
    }
})

app.use('/',require('./routes/pages'));
app.use('/auth',require('./routes/auth'));
app.use('/auth2',require('./routes/user'));
app.use('/auth3',require('./routes/forget'));
app.use('/auth4',require('./routes/comfirm'));
app.use('/auth5',require('./routes/change'));
app.use('/auth6',require('./routes/new'));
//Google Auth
const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = '19764794757-6ita4tcpu1erdunaci5vk8kbt2n10eoq.apps.googleusercontent.com'
const client = new OAuth2Client(CLIENT_ID);


app.post('/login', (req,res)=>{
    let token = req.body.token;

    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,  
        });
        const payload = ticket.getPayload();
        const userid = payload['sub'];
      }
      verify()
      .then(()=>{
          res.cookie('session-token', token);
          res.send('success');
      })
      .catch(console.error);

})

app.listen(5001,() => {
    console.log('app is listening port 5003');  
});
