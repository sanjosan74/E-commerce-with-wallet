var express = require('express');
var router = express.Router();
var businessHelpers = require('../helpers/question-helpers')
var bcHelpers = require('../helpers/bchelpers');
const { AuthMechanism } = require('mongodb');
/* GET users listing. */
router.get('/', function(req, res, next) {
   
        businessHelpers.getAllQuestion().then((questions)=>{
            res.render('questions',{questions,admin:true});
        })
        
    });
    
    router.get('/addq',function(req,res){
        let user=req.session.user;
        res.render('payQ',{user});
    });
 
    router.get('/addqi', function(req, res, next) {
        let user=req.session.user;
        // AuthMechanism
        let am = user.wallet-10;
        console.log(am);
        bcHelpers.updateProduct(user._id,am);
        let date=new Date();
        res.render('addq',{admin:true,user,date});

    });


router.post('/addq',(req,res)=>{
        //res.send('sanjo')
        //console.log(req.body);
        businessHelpers.addQuestions(req.body,(result)=>{
            // res.send("data submitted successfully")
            res.redirect('/mainpage/questions')
        })
    
    })
    router.get("/ques-to-qcart/:id", (req, res) => {
       let user=req.session.user;
       let que=req.params.id;
          res.render("answer",{admin:true,user,que});
          
       
      });
      router.post("/answer", (req, res) => {
        businessHelpers.addBusiness( req.body,(result)=>{
            console.log('q.js')
            console.log(result.insertedId);
            businessHelpers.qaddToCart(req.body.que,result.insertedId);
        });
       console.log(global.que);
       res.redirect('/mainpage/questions')

      });
module.exports = router;