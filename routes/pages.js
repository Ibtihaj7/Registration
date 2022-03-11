const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');

router.use(express.json());
router.use(cookieParser());

const app = express();
app.set('view engine','hbs')

router.get('/',(req,res) => {
    res.render('logIn'); 
});

router.get('/register',(req,res) => {
    res.render('signUp'); 
});
router.get('/user',(req,res) => {
    res.render('logIn',{
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
            audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
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
router.use((req,res) => {
    res.status(404).send("soory,cant find that");
    
})

module.exports = router;