var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    let businesses=[{
        name:"Devus",category:"general-store",description:"sells general stuff with juice shop",imagelink:""
    },{
        name:"SMS",category:"general-store/stationary/bakery",description:"sells general stuff with juice shop",imagelink:""
    }
]
    res.render('admin',{name:'sanjo',businesses,admin:true});
});

module.exports = router;
