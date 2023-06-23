const SHA256 = require("crypto-js/sha256");
let hash = require('object-hash');
const Block = require('./block');
const { Db } = require("mongodb");
const { response } = require('express')


//create a JavaScript class to represent a Block

//  class Block{
//   constructor(index, timestamp, data, previousHash){
//     this.index = index;
//     this.timestamp = timestamp;
//     this.data = data;
//     this.previousHash = previousHash;
//     this.hash = this.generateHash();
//   }

//   generateHash(){
//     return( SHA256(this.index + this.timestamp + this.previousHash + JSON.stringify(this.data)).toString())
//   }
// } 








class Blockchain{
    constructor(){
       this.blockchain = [this.createGenesisBlock()];
        // this.chain=[];
        // this.curr_transactions=[];

   
    }

    // addNewBlock(prevHash){
    //     let block={
    //         index:this.chain.length + 1,
    //         timestamp:Date.now(),
    //         transactions:this.curr_transactions,
           
    //         prevHash:prevHash,
            
    //     };
    //     this.hash=hash(block);
    //     this.chain.push(block);
    //     this.curr_transactions=[];
    //     return block;
    // }

    // addNewTransactions(sender,receipient,amount){
    //     this.curr_transactions.push({sender,receipient,amount})
    // }
    // lastBlock(){

    //     return this.chain.slice(-1)[0];
    // }
    // isEmpty(){
    //     return this.chain.length == 0;
    // }
    createGenesisBlock(){
        return new Block(0, "11/04/2022", "first block on the chain", "0");
    }
    getTheLatestBlock(){
        return this.blockchain[this.blockchain.length - 1];
    }
    addNewBlock(newBlock){
        newBlock.previousHash = this.getTheLatestBlock().hash;
        newBlock.hash =newBlock.generateHash();
        this.blockchain.push(newBlock);
    }

    // testing the integrity of the chain
    validateChainIntegrity(){
        for(let i = 1; i<this.blockchain.length; i++){
            const currentBlock = this.blockchain[i];
            const previousBlock = this.blockchain[i-1];
            if(currentBlock.hash !== currentBlock.generateHash()){
                return false;
            }
            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
            return true;

        }
    }
} 

//  let logCoin = new Blockchain();
// console.log("mining logcoin in progress...");
// logCoin.addNewBlock(
//     new Block(1, "06/04/2022", {
//         sender: "Sanjo",
//         recipient: "Muralee",
//         quantity: 25
//     })
//   //  db.get().collection('logcoin').insertOne(Block)
// );
// db.get().collection('logcoin').insertOne(Block)
// logCoin.addNewBlock(
//     new Block(2, "08/08/2022", {
//         sender: "Muralee",
//         recipient: "Adwaidh",
//         quantity: 34
//     })
// );

// logCoin.addNewBlock(
//     new Block(3, "13/08/2022", {
//         sender: "Arjun V",
//         recipient: "sanjo",
//         quantity: 34
//     })
// );
// console.log(JSON.stringify(logCoin, null, 5))
// module.exports = Block;
module.exports=Blockchain;