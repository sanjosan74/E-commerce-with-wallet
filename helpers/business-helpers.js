var db=require('../config/connection')
var collection=require('../config/collection')
const { response } = require('express')
const { ObjectId } = require('mongodb')
var ObjectID=require('mongodb').ObjectID
//var dbo = db.get();
module.exports={
    addBusiness:(businesses,callback)=>{
        
        db.get().collection('business').insertOne(businesses).then((data)=>{
           // console.log(data);
            callback(data)
        })
    },
    addProduct:(products,callback)=>{
        
        db.get().collection(collection.PRODUCT_COLLECTION).insertOne(products).then((data)=>{
           // console.log(data);
            callback(data)
        })
    },
    getAllBusiness:()=>{
        return new Promise(async(resolve,reject)=>{
            
            let business=await db.get().collection(collection.BUSINESS_COLLECTION).find().toArray()
            resolve(business)
        })
    },

    getAllProducts:()=>{
        return new Promise(async(resolve,reject)=>{
            
            let products=await db.get().collection(collection.PRODUCT_COLLECTION).find().toArray()
            resolve(products)
        })
    },


    deleteProduct:(prodId)=>{
        console.log(prodId);
        // exit();
         return new Promise((resolve,reject)=>{
             db.get().collection(collection.BUSINESS_COLLECTION).deleteOne({_id:new ObjectId(prodId)}).then((response)=>{
                resolve(response)
               //  console.log('delete function')
             })
         })
        
    },
   
    


    getProductDetails:(edId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.BUSINESS_COLLECTION).findOne({_id:new ObjectId(edId)}).then((product)=>{
                resolve(product)
            })
        })
    },

    updateProduct:(proId,proDetails)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.BUSINESS_COLLECTION).updateOne({_id:new ObjectId(proId)},{
                $set:{
                    name:proDetails.name,
                    inputPassword4:proDetails.inputPassword4
                }
            })
        })
    }

}  


