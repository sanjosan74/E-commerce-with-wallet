var express = require('express');
var router = express.Router();
var eventHelpers = require('../helpers/event-helpers');
var db=require('../config/connection')

const { ObjectId, Db } = require('mongodb');
const bchelpers = require('../helpers/bchelpers');
/* GET users listing. */
router.get('/', function(req, res, next) {
   
    eventHelpers.getAllEvents().then((events)=>{
        res.render('ogan/eventsindexo',{events});
    })
    
});


router.get('/addevents', function(req, res, next) {
 
    res.render('evnpay');
});

router.get('/addeventsi', function(req, res, next) {
    let user=req.session.user;
    // AuthMechanism
    let am = user.wallet-8;
    console.log(am);
    bchelpers.updateProduct(user._id,am);
    let date=new Date();
    
    res.render('addevents',{user,date});
});

router.post('/addevents',(req,res)=>{
    //res.send('sanjo')
    //console.log(req.body);
    
    eventHelpers.addEvents(req.body,(result)=>{
        res.redirect('/mainpage/events')
    })

})

router.get('/view/:id', function(req, res, next) {
    let ids = req.params.id;
    let idm=new ObjectId(ids)//ObjectId("60f532903ded77001064ae92")
//    let evnt= db.get().collection(events).find({_id :idm });
   
   eventHelpers.getEvent(idm).then((event)=>{
    
    res.render('eventcard',{event});
})
   
});

module.exports = router;