var db=require('../config/connection')
var collection=require('../config/collection')
const { ObjectId } = require('mongodb')
//var dbo = db.get();
module.exports={
    addQuestions:(questions,callback)=>{
        
        db.get().collection('questions').insertOne(questions).then((data)=>{
           // console.log(data);
            callback(data)
        })
    },
    getAllQuestion:()=>{
        return new Promise(async(resolve,reject)=>{
            let questions=await db.get().collection(collection.QUESTION_COLLECTION).find().toArray()
            resolve(questions)
        })
    },
    addBusiness:(businesses,callback)=>{
        
        db.get().collection('answers').insertOne(businesses).then((data)=>{
            console.log(data.insertedId);
            callback(data)
        }) 
    },
    qaddToCart:(qId,ans)=>{
      let ansObj={
        item: new ObjectId(ans)
      }

        return new Promise(async (resolve, reject) => {
            let qCart = await db.get().collection('qCart').findOne({ que: new ObjectId(qId) });
            if (qCart) {
              db.get().collection('qCart').updateOne(
                  { que: new ObjectId(qId) },
                  {
                    $push: { products: ansObj },
                  }
                )
                .then((response) => {
                  console.log('qaddto cart response if');
                  console.log(response);
                  resolve();
                });
            } else {
              let cartOb = {
                que: new ObjectId(qId),
                products: [ansObj]
              };
              db.get()
                .collection('qCart')
                .insertOne({name:'hii'})
                .then((response) => {
                  console.log('qaddto cart response');
                  console.log(cartOb);
                  console.log(response);
                  resolve();
                });
            }
          });
    }
}  
