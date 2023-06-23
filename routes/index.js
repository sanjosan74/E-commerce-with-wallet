var express = require('express');
var router = express.Router();
const userHelpers = require('../helpers/user-helpers')
/* GET home page. */
router.get('/', function(req, res, next) {
  
  res.render('index', {admin:true,"loginErr":req.session.loginErr});

 req.session.Err=false

});

router.post('/signup',(req,res)=>{
      userHelpers.doSignup(req.body).then((response)=>{
        console.log(response)
      })
})

router.post('/login',(req,res)=>{
  userHelpers.doLogin(req.body).then((response)=>{
    if(response.status){
      console.log('here')
      req.session.loggedIn=true
      req.session.user=response.user
      res.redirect('/mainpage')
     // let user=req.session.user
      console.log(response.user); 
    //  req.session.user=user;
    //  req.session.authorized = true;
    //  res.redirect('/mainpage');
    //  console.log(user); 

      
    }
    else{
      req.session.loginErr=true
      res.redirect('/')
    }
  })
 // res.send('ok')
})




module.exports = router;
