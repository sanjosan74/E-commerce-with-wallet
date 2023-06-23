var express = require('express');
var router = express.Router();
var businessHelpers = require('../helpers/business-helpers')
const Blockchain = require('../config/blockchain')
const Block = require('../config/block')
//stripe

require('dotenv').config
// const express = require('express')
const bodyparser = require('body-parser')
const path = require('path')
const app = express()
app.use(express.json())
 
var Publishable_Key = 'pk_test_51NHlAXSXyrG5MXv8Gi1ZRj4QjgQznakCbEs4aa0wKyQzz8zkYruPWZ9rQig8rbhqcCLtPsgH7fS0Tc16ubmxnj001xUNKqGM'
var Secret_Key = Stripe_key_s
 
const stripe = require('stripe')(Secret_Key)
 
// const port = process.env.PORT || 3000
 
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())
//stripe
// const Block = require('../config/cryptohash')
const SHA256 = require("crypto-js/sha256");


// main.js
const logCoin = require('../config/logcoin');
const bchelpers = require('../helpers/bchelpers');
const Razorpay = require('razorpay');
const logcoin = require('../config/logcoin');
const { log } = require('console');




/* GET users listing. */
router.get('/', function(req, res, next) {
    let user=req.session.user;
    
        res.render('buycrypto',{user});

});

router.get('/buy', function(req, res, next) {
    //    key: Publishable_Key
       // console.log(global.qwe)
    let user=req.session.user;
    res.render('buy',{user,key: Publishable_Key});
});

router.post('/buy',async (req,res)=>{
    console.log(req.body.quantity)
    const session = await stripe.checkout.sessions.create({
        success_url: 'http://localhost:3000/mainpage/buycrypto',
        // success_url: 'https://example.com/succes',
        line_items: [
          {price: 'price_1NLoXVSAfXyrG5MXV1GBytNn', quantity: req.body.quantity},
        ],
        mode: 'payment',
      });
    let data = req.body;
    let user=req.session.user;
    console.log(session)
    console.log('env data:')
      console.log(process.env.stripe_key)
    res.render('stripe',{key: Publishable_Key,user,data, session_id: session.id})
}
)
//buy

router.post('/payment',(req,res)=>{//buy
   
    //res.send('sanjo')
  
     if(global.vall/*true*/){
        global.am=parseInt(req.body.quantity)+parseInt(req.session.user.wallet)
        global.t = 100*parseInt(req.body.quantity);
     }
     else{
        global.am=parseInt(req.body.quantity)
    global.t = 100*parseInt(req.body.quantity);
        global.vall=true;
     }
    // stripe.customers.create({
    //     email: req.body.stripeEmail,
    //     source: req.body.stripeToken,
    //     name: 'Gourav Hammad',
    //     address: {
    //         line1: 'TC 9/4 Old MES colony',
    //         postal_code: '452331',
    //         city: 'Indore',
    //         state: 'Madhya Pradesh',
    //         country: 'India',
    //     }
    // })
    
    // .then((customer) => {
 
    //     return stripe.charges.create({
    //         amount: 10000,      // Charging Rs 25
    //         description: 'Web Development Product',
    //         currency: 'INR',
    //         customer: customer.id
    //     });
    // })
    // .then((charge) => {
    //     res.send("success h j")  // If no error occurs
    // })
    // .catch((err) => {
    //     res.send(err)       // If some error occurs
    // });
    // bchelpers.updateProduct(req.session.user._id,global.am)


  
    logCoin.addNewBlock(
            new Block(1, new Date(), {
                sender: "BLOCKCHAINWALLET",
                recipient: req.session.user.name ,
                quantity: req.body.quantity
            })
        );
       
        let nn= logcoin.validateChainIntegrity()
        if(nn){
            console.log('Block Valid');
        }
        console.log(JSON.stringify(logCoin, null, 5))
})
router.post("/create-checkout-session", async (req, res) => {
  res.send('hi')
})

// router.post("/create-checkout-session", async (req, res) => {
//     try {
//       const session = await stripe.checkout.sessions.create({
//         payment_method_types: ["card"],
//         mode: "payment",
//         line_items: req.body.items.map(item => {
//           const storeItem = storeItems.get(item.id)
//           return {
//             price_data: {
//               currency: "inr",
//               product_data: {
//                 name: storeItem.name,
//               },
//               unit_amount: storeItem.priceInCents,
//               // unit_amount: req.body.vall,
//             },
//             quantity: item.quantity,
//           }
//         }),
//       //   success_url: `${process.env.CLIENT_URL}/success.html`,
//       //   cancel_url: `${process.env.CLIENT_URL}/cancel.html`,
//       success_url: 'http://localhost:3000/success.html',
//         cancel_url: 'http://localhost:3000/cancel.html',
//       })
//       res.json({ url: session.url })
//     } catch (e) {
//       res.status(500).json({ error: e.message })
//     }
//   })

module.exports = router;