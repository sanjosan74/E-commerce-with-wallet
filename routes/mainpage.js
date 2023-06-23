var express = require('express');
var router = express.Router();
const stripe = require("stripe")


/* GET users listing. */
router.get('/', function(req, res, next) {
    let user=req.session.user
  //  console.log(user);
    res.render('mainpage',{user,admin:true});
});


router.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map(item => {
        const storeItem = storeItems.get(item.id)
        return {
          price_data: {
            currency: "inr",
            product_data: {
              name: storeItem.name,
            },
            unit_amount: storeItem.priceInCents,
            // unit_amount: req.body.vall,
          },
          quantity: item.quantity,
        }
      }),
    //   success_url: `${process.env.CLIENT_URL}/success.html`,
    //   cancel_url: `${process.env.CLIENT_URL}/cancel.html`,
    success_url: 'http://localhost:3000/success.html',
      cancel_url: 'http://localhost:3000/cancel.html',
    })
    res.json({ url: session.url })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

module.exports = router;