var express = require("express");
var router = express.Router();
var businessHelpers = require("../helpers/business-helpers");
var userHelpers = require("../helpers/user-helpers");
var ObjectID = require("mongodb").ObjectID;
const { ObjectId } = require("mongodb");
var bodyParser = require('body-parser'); 
router.use(bodyParser.json()); // to support JSON bodies
router.use(bodyParser.urlencoded({ extended: true }));
var path = require('path')
const verifyLogin = (req, res, next) => {
  if (req.session.loggedIn) {
    next();
  } else {
    res.redirect("/");
  }
};

/* GET users listing. */
router.get("/", function (req, res, next) {
  //  console.log(user);
  // const bloggerdashboard_path = path.join(
  //   __dirname,
  //   "./views/ogan/indexo.hbs" 
  // );
  let user = req.session.user;
  // res.render('lbbook',{user})
  businessHelpers.getAllBusiness().then((business) => {
    res.render('ogan/indexo', { business, user ,admin:true});
  });
});

router.get("/add", function (req, res, next) {
  res.render("add");
});

router.post("/add", (req, res) => {
  //res.send('sanjo')
  //console.log(req.body);
  businessHelpers.addBusiness(req.body, (result) => {
    //res.send("data submitted successfully");
    res.redirect('/mainpage/lbbook')
  });
});

router.get("/delete-product/:id", (req, res) => {
  let proId = req.params.id;
  console.log(proId);
  
  businessHelpers.deleteProduct(proId).then((response) => {
    res.redirect("/mainpage");
  });
});

router.get("/edit-product/:id", async (req, res) => {
  let edId = req.params.id;
  let product = await businessHelpers.getProductDetails(edId);
  //  businessHelpers.deleteProduct(proId)
  res.render("edit-product", { product });
  console.log(product);
});
router.post("/edit-product/:id", (req, res) => {
  businessHelpers.updateProduct(req.params.id, req.body);
});

router.get("/view-all-products/add-to-cart/:id", (req, res) => {
  userHelpers.addToCart(req.params.id, req.session.user._id).then(() => {
    res.redirect("/mainpage/lbbook");
    //  res.send('added to cart')
  });
});
/*  
router.get("/", function (req, res, next) {
  //  console.log(user);
  // const bloggerdashboard_path = path.join(
  //   __dirname,
  //   "./views/ogan/indexo.hbs" 
  // );
  let user = req.session.user;
  // res.render('lbbook',{user})
  businessHelpers.getAllBusiness().then((business) => {
    res.render('ogan/indexo', { business, user ,admin:true});
  });
});
*/
router.get("/cart", verifyLogin, async (req, res,next) => {
  let user = req.session.user;
  let products = await userHelpers.getCartProducts(req.session.user._id);
  console.log(products);
  // console.log("maaxiwala");
  res.render("cart", { user, products });
});

router.get("/view/:id", verifyLogin, async (req, res) => {
  let user = req.session.user;
  console.log(req.params.id);

  // let  products=await userHelpers.getCartProducts(req.session.user._id)
  // console.log(products);
  //  let  products=await userHelpers.viewShopProducts(req.params.id)
  // console.log(products);

  console.log(req.params.id);

  let Bid = req.params.id;
  if (!ObjectId.isValid(Bid)) {
    //reject(new Error(`Invalid userId: ${userId}`));
    Bid = new ObjectId(Bid);

    console.log("naruto");
    console.log(Bid);
  }
  
  let products = await userHelpers.viewShopProducts(Bid);
  console.log(req.params.id);
  //  console.log(d);
  console.log("taxiwala");
  console.log(products);
  res.render("view", { user, products });
  console.log("tax,iwala");
 
  console.log('hizaq');
});

router.get("/add-item-to-shop/:id", verifyLogin, (req, res) => {
 
  let user = req.session.user;
  var Bid = req.params.id;
  res.render("itemtoshop", { user, Bid });
});

router.post("/add-item-to-shop/addproduct", (req, res) => {
 ;
  businessHelpers.addProduct(req.body, (result) => {
    console.log(result.insertedId);
    console.log(req.body.inputCity);
    console.log(req.body._id);
    var Bid = req.body.inputCity;
    var proID = result.insertedId;
    userHelpers.spAddToCart(proID, Bid).then(() => {
      res.send("data submitted successfully");
    });

  });
  
});

router.get("/view-all-products", function (req, res, next) {
  let user = req.session.user;
  businessHelpers.getAllProducts().then((products) => {
    res.render("view-all-products", { products, user });
  });
});

router.post("/cart/change-product-quantity", (req, res, next) => {
  console.log("jtr hgf hgcy ghff");
  console.log(req.body);
  userHelpers.changeProductQuantity(req.body).then(() => {
    res.redirect('/mainpage/lbbook/cart')
  });
});

router.get("/cart/place-order", async (req, res) => {
  let total = await userHelpers.getTotalAmount(req.session.user._id);

  res.render("place-order", { total });
  // res.send('ok')
});

router.post("/cart/place-order/order-placed", async (req, res) => {
  // userHelpers.placeOrder(req.session.user._id).then((pro)=>{
  //  })
  let products=await userHelpers.getCartProductList(req.session.user._id);
  let totalprice = await userHelpers.getTotalAmount(req.session.user._id);
  userHelpers.placeOrder(req.session.user._id,products,totalprice)
  console.log(req.body);
  console.log(req.body.optradio);
  // if(req.body=={ hi: 'jhbsj', 'payment-method': 'bl o c o q ' }){
  //   res.send('hi')
  // }
  res.redirect('/mainpage/lbbook')
  console.log("iraga");
});
module.exports = router; 
