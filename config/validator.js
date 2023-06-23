module.exports.validProof = (proof)=>{
    let guessHash = hash(proof);
    console.log("HAshing: ",guessHash);
    return guessHash == hash(PROOF);
};
module.exports.proofOfWork=()=>{
    let proof=0;
    while(true){
        if(!validProof(proof)){
            proof++;
        }else{
            break;
        }
    }
    return proof;
}




let proofOfWork=()=>{
   
}
