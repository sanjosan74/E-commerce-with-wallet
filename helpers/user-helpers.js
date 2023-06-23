var db = require("../config/connection");
var collection = require("../config/collection");
const bcrypt = require("bcrypt");
const { ObjectId } = require("mongodb");
const { response } = require("express");
var ObjectID = require("mongodb").ObjectID;
module.exports = {
  doSignup: (userData) => {
    return new Promise(async (resolve, reject) => {
      //userData.Password=await bcrypt.hash(userData.Password,10)
      db.get()
        .collection(collection.USER_COLLECTION)
        .insertOne(userData)
        .then((data) => {
          console.log(userData);
          //callback(data)
          resolve(data.insertedId);
        });
    });
  },
  doLogin: (userData) => {
    return new Promise(async (resolve, reject) => {
      let loginStatus = false;
      let response = {};
      let user = await db
        .get()
        .collection(collection.USER_COLLECTION)
        .findOne({ name: userData.name });
      if (user) {
        response.user = user;
        response.status = true;
        console.log("success  login ");
        console.log(response.user);
        // resolve({status:true})
        // response.status=false
        resolve(response);
        //  bcrypt.compare()
      } else {
        console.log("fail login ");
        resolve({ status: false });
        //resolve({status:true})
        response.status = false;
        resolve(response);
      }
    });
  },

  addToCart: (proId, userId) => {
    let proObj = {
      item: new ObjectId(proId),
      quantity: 1,
      unit: "undefined",
    };
    return new Promise(async (resolve, reject) => {
      let userCart = await db
        .get()
        .collection(collection.CART_COLLEECTION)
        .findOne({ user: new ObjectId(userId) });
      if (userCart) {
        db.get()
          .collection(collection.CART_COLLEECTION)
          .updateOne(
            { user: new ObjectId(userId) },
            {
              $push: { products: proObj },
            }
          )
          .then((response) => {
            resolve();
          });
      } else {
        let cartObj = {
          user: new ObjectId(userId),
          products: [proObj],
        };
        db.get()
          .collection(collection.CART_COLLEECTION)
          .insertOne(cartObj)
          .then((response) => {
            resolve();
          });
      }
    });
  },
  getCartProducts: (userId) => {
    // console.log(userId);
    return new Promise(async (resolve, reject) => {
      let cartItems = await db
        .get()
        .collection(collection.CART_COLLEECTION)
        .aggregate([
          {
            $match: { user: new ObjectId(userId) },
          },
          {
            $unwind: "$products",
          },
          {
            $project: {
              item: "$products.item",
              quantity: "$products.quantity",
              unit: "$products.unit",
            },
          },
          {
            $lookup: {
              from: collection.PRODUCT_COLLECTION,
              localField: "item",
              foreignField: "_id",
              as: "product",
            },
          },
          {
            $project: {
              item: 1,
              quantity: 1,
              product: { $arrayElemAt: ["$product", 0] },
            },
          },
          // {
          //     $lookup:{
          //         from:collection.BUSINESS_COLLECTION,
          //         let:{prodList:'$products'},
          //         pipeline:[
          //             {
          //                     $match:{
          //                         $expr:{
          //                             $in:['$_id', "$$prodList"]
          //                         }
          //                     }
          //             }
          //         ],
          //         as:'cartItems'
          //     }
          // }
        ])
        .toArray();
     // console.log(cartItems[0].products);
      resolve(cartItems);
    });
  },

  viewShopProducts: (userId) => {
    // console.log(userId);
    return new Promise(async (resolve, reject) => {
      let cartItems = await db
        .get()
        .collection(collection.BUSIPRO_COLLECTION)
        .aggregate([
          {
            $match: { business: new ObjectId(userId) },
          },
          {
            $lookup: {
              from: collection.PRODUCT_COLLECTION,
              let: { prodList: "$products" },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $in: ["$_id", "$$prodList"],
                    },
                  },
                },
              ],
              as: "cartItemsr",
            },
          },
        ])
        .toArray();
      resolve(cartItems[0].cartItemsr);
    });
  },

  spAddToCart: (proId, userId) => {
    return new Promise(async (resolve, reject) => {
      let userCart = await db
        .get()
        .collection(collection.BUSIPRO_COLLECTION)
        .findOne({ business: new ObjectId(userId) });
      if (userCart) {
        db.get()
          .collection(collection.BUSIPRO_COLLECTION)
          .updateOne(
            { business: new ObjectId(userId) },
            {
              $push: { products: new ObjectId(proId) },
            }
          )
          .then((response) => {
            resolve();
          });
      } else {
        let cartObj = {
          business: new ObjectId(userId),
          products: [new ObjectId(proId)],
        };
        db.get()
          .collection(collection.BUSIPRO_COLLECTION)
          .insertOne(cartObj)
          .then((response) => {
            resolve();
          });
      }
    });
  },

  changeProductQuantity: (details) => {
    console.log("hi i reached");
    console.log(details);
    details.count = parseInt(details.count);
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.CART_COLLEECTION)
        .updateOne(
          {
            _id: new ObjectId(details.cartid),
            "products.item": new ObjectId(details.proid),
          },
          {
            $inc: { "products.$.quantity": details.count },
          }
        )
        .then(() => {
          resolve();
        });
    });
  },

  getTotalAmount: (userId) => {
    return new Promise(async (resolve, reject) => {
      let cartItems = await db
        .get()
        .collection(collection.CART_COLLEECTION)
        .aggregate([
          {
            $match: { user: new ObjectId(userId) },
          },
          {
            $unwind: "$products",
          },
          {
            $project: {
              item: "$products.item",
              quantity: "$products.quantity",
              unit: "$products.unit",
            },
          },
          {
            $lookup: {
              from: collection.PRODUCT_COLLECTION,
              localField: "item",
              foreignField: "_id",
              as: "product",
            },
          },
          {
            $project: {
              item: 1,
              quantity: 1,
              product: { $arrayElemAt: ["$product", 0] },
            },
          },
          {
            $group: {
              _id: null,
              total: {
                $sum: {
                  $multiply: ["$quantity", { $toInt: "$product.price" }],
                },
              },
            },
          },
        ])
        .toArray();
      console.log(cartItems);
      resolve(cartItems[0].total);
    });
  },

  placeOrder: (user,product,total) => {
    return new Promise((resolve,reject)=>{
      //console.log(order.payment-method);
      console.log(user);

      let status='placed';
      let orderObj={
        userId:new ObjectId(user),
        products:product,
        stat:status,
      
      }
      db.get().collection(collection.ORDER_COLLECTION).insertOne(orderObj).then((response)=>{
        db.get().collection(collection.CART_COLLEECTION).deleteOne({user:new ObjectId(user)})
        resolve() 
      })
    })
  },

  getOrder: (userId) => {},

  deleteOrder: (proId, userId) => {},

  getCartProductList:(userId)=>{
    return new  Promise (async(resolve,reject)=>{
      let cart=await db.get().collection(collection.CART_COLLEECTION).findOne({user:new ObjectId(userId)})
      resolve(cart.products)
    })
  }
};
