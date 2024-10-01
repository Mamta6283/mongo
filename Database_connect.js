const mongo=require('mongoose')
mongo.connect('mongodb://localhost:27017/EmployeeData',{
        useNewUrlParser:true,
        useUniFiedTopology:true
})  .then(()=>{
    console.log("db connected")
}).catch(()=>{
    console.log("mongodb server shutdoown please connect it ")
})

module.exports=mongo

//projects:---
//4 pages 
//index.ejs
//about.ejs
//contact.ejs
//signup.ejs//email ,password ,photo,address,name gender 
//client side validation addmin panel navbar different 
//Common navbar
//name //subject //mobile //address
//login //email //password


