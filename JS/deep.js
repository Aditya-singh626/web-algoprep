let user={
    name:"aditya singh",
    age:"343",
    address:{
        city:"delhi",
        pincode:"345345"
    }
};
let usercopy = JSON.parse(JSON.stringify(user));//or you can use structuredClone(user)
usercopy.address.city = "mumbai";
usercopy.name = "raj singh";
console.log(user);
console.log(usercopy);
