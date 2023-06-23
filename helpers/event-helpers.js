var db=require('../config/connection')
var collection=require('../config/collection')
//var dbo = db.get();
module.exports={
    addEvents:(events,callback)=>{
        
        db.get().collection('events').insertOne(events).then((data)=>{
           // console.log(data);
            callback(data)
        })
    },
    getAllEvents:()=>{
        return new Promise(async(resolve,reject)=>{
            let events=await db.get().collection(collection.EVENT_COLLECTION).find().toArray()
            resolve(events)
        })
    },
    getEvent:(idm)=>{
        return new Promise(async(resolve,reject)=>{
            
            let evnts=await db.get().collection(collection.EVENT_COLLECTION).find({_id :idm }).toArray()
            console.log(evnts);
            resolve(evnts)
        })
    }
}  
