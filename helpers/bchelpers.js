var db=require('../config/connection')
var collection=require('../config/collection')
const { response } = require('express')
const { ObjectId } = require('mongodb')
let Blockchain=require("../config/blockchain");
let blockchain=new Blockchain();
let hash = require('object-hash')
let TARGET_HASH = 156;
let validator =require('../config/validator')
const Razorpay=require('razorpay')
global.vall=false;
var instance= new Razorpay({
    key_id: 'rzp_test_xbkkCY21TwzcJn',
    key_secret: 'H7ZfLGmwJS1OVAbAEC8JYITG',
});
// var ObjectID=require('mongodb').ObjectID

// let validProof = (proof)=>{
//     let guessHash = hash(proof);
//     console.log("HAshing: ",guessHash);
//     return guessHash == hash(PROOF);
// };

// let proofOfWork=()=>{
//     let proof=0;
//     while(true){
//         if(!validProof(proof)){
//             proof++;
//         }else{
//             break;
//         }
//     }
//     return proof;
// }

//if(proofOfWork()==PROOF){
//blockchain.addNewTransactions("sanjo","hhh",200);
//let prevHash = blockchain.lastBlock() ? blockchain.lastBlock().hash : null;
//blockchain.addNewBlock(prevHash)
//}
//console.log("Chain: ",blockchain.chain)
module.exports={
    
        updateProduct:(userId,amt)=>{
            console.log('kjh');
            return new Promise((resolve,reject)=>{
              db.get().collection(collection.USER_COLLECTION).updateOne({_id:new ObjectId(userId)},{
                    $set:{
                        wallet:amt
                    
                    }
                })
                resolve();
            })
        },
        generateRazorPay:(am)=>{
            console.log('khs');
            return new Promise((resolve,reject)=>{
                var options={
                    amount: am,
                    currency: 'INR',
                    receipt:'Order_8' ,
                }; 
                
                instance.orders.create(options,function(err,order){
                    if(err){
                        console.log('error');
                        console.log(err);
                    }
                    else{
                        console.log('k;hljhguyg');
                    console.log(order);
                    
                    resolve(order)
                    }
                });

            })
           
        }
    
    // addBusiness:(businesses)=>{
        
    //     db.get().collection('logcoin').insertOne(businesses)
    //     console.log('inserted?');
    // }

   


}