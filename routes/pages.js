// const cookieParser = require('cookie-parser');
const express = require('express');
const router = express.Router();

const app = express();
app.set('view engine','hbs')

router.get('/',(req,res) => {
    res.render('logIn',{
        message:false
    }); 
});
router.get('/forget',(req,res) => {
    res.render('forget',{
        message:false
    }); 
});


router.get('/register',(req,res) => {
    res.render('signUp',{
        message:false
    }); 
});


router.get('/user',(req,res) => {
    res.render('logIn',{
        message:false
    }); 
});
router.post('/user',(req,res) => {
    let token = req.body.token;
    console.log(token);
})
router.get('/home',(req,res) => {
    let user = req.user;
    res.render('home',{user }); 
});

router.get('/profile', checkAuthenticated, (req, res)=>{
    let user = req.user;
    res.render('home', {user});
})

router.get('/protectedRoute', checkAuthenticated, (req,res)=>{
    res.send('This route is protected');
})

router.get('/logout', (req, res)=>{
    res.clearCookie('session-token');
    res.redirect('/user')

})
router.get('/comfirm',(req,res) => {
    res.render('comfirm',{
        message:false
    }); 
});
router.get('/new',(req,res) => {
    res.render('newPassword',{
        message:false
    }); 
});
router.get('/changePas',(req,res) => {
    res.render('changePas',{
        message:false
    }); 
});

router.get('/register',(req,res) => {
    res.render('signUp',{
        message:false
    }); 
});



router.get('/home',(req,res) => {
    let user = req.user;
    res.render('home',{user }); 
});

router.get('/profile', checkAuthenticated, (req, res)=>{
    let user = req.user;
    res.render('home', {user});
})

router.get('/protectedRoute', checkAuthenticated, (req,res)=>{
    res.send('This route is protected');
})

router.get('/logout', (req, res)=>{
    res.clearCookie('session-token');
    res.redirect('/user')

})


function checkAuthenticated(req, res, next){

    let token = req.cookies['session-token'];

    let user = {};
    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID, 
        });
        const payload = ticket.getPayload();
        user.name = payload.name;
        user.email = payload.email;
        user.picture = payload.picture;
      }
      verify()
      .then(()=>{
          req.user = user;
          next();
      })
      .catch(err=>{
          res.redirect('/logout')
      })

}

module.exports = router;