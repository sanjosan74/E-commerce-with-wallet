var express = require('express');
var router = express.Router();
const userHelpers = require('../helpers/user-helpers')
/* GET users listing. */
router.get('/', function(req, res, next) {
   
    res.render('signup',{admin:true});
});

router.post('/signup',(req,res)=>{
    userHelpers.doSignup(req.body).then((response)=>{
        console.log(response)
        global.vall=false;
       // res.send('okk')
    })
})

module.exports = router;