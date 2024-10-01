const express=require("express")

const app=express()
const port=2022;
const myrouter=require('./route')
const path=require('path')

const bodyparser=require('body-parser') //for collecting form data

const session=require('express-session');

app.use(bodyparser.urlencoded({extended:false})) //express td set the body-parser

app.use('/static',express.static(__dirname+'/static'))  //for allow external static content
app.use('/css',express.static(path.join(__dirname,'node_modules/bootstrap/dist/css')))
app.use('/js',express.static(path.join(__dirname,'node_modules/bootstrap/dist/js')))

app.set("view engine","ejs")

app.use(session(
    {
        secret:"user_emailid",
        resave:false,
        saveUninitialized:true,
        cookie:{maxAge:60000}   
        
    }
))

app.use("/",myrouter)

// app.get("/idli",(req,res)=>{
//     res.render("this another link ")
// })
   
app.listen(port,()=>{
    console.log(`click here http://localhost:${port}`) 
})


// hr@himsoftsolution.com
//7018489966 (hr,nisha)
//job apply
//pankaj shrma /jagdeesh ranjhA(OWNER)


