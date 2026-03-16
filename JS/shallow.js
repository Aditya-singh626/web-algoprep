let user={
    name:"aditya singh",
    age:"343",
    address:{
        city:"delhi",
        pincode:"345345"
    }
};
// shallow copy the object is only work on nested object like address.  

let user={
    name:"aditya singh",
    age:"343",
    address:{
        city:"delhi",
        pincode:"345345"
    }
};

//array shallow copy 
 let arr = [ 1,3,2,4,5];
 let arrcopy = {...arr};
 arrcopy[0] = 234;
 console.log(arr);
 console.log(arrcopy);

 //array object
let users = [
    {
        name:"adity singh"
    },
    {
        age:"343"
    }
]
let userscopy = {...users};
userscopy[0].name = "raj singh";
console.log(users);
console.log(userscopy);