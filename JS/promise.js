let promise = new Promise(function(resolve,reject){
    if(success){
        resolve("task done");
    }
    else{
        reject("failed");
    }
});
promise.then(function(result){
    console.log(result);
}).catch(function(error){
    console.log(error);
});