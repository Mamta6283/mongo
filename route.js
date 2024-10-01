const express=require('express')
const router =express.Router()
const Emp_obj=require('./controller/EmployeeController')
const user_obj=require('./controller/UserController')

router.get('/',(req,res)=>{
   res.render('Home')
   res.end()
})
router.post('/',(req,res)=>{
   Emp_obj.Add_Record(req,res)
})
router.use('/delete_record',(req,res)=>{
   Emp_obj.Delete_Emp(req,res)
})

router.use('/display_record',(req,res)=>{
   Emp_obj.Display_Emp(req,res)
})
router.use('/search_record',(req,res)=>{
   Emp_obj.Search_Emp(req,res)
})
router.use('/update_record',(req,res)=>{
   Emp_obj.Update_Emp(req,res)
})
router.use('/update_records',(req,res)=>{
   Emp_obj.Update_Emp_final(req,res)
})
router.use('/login',(req,res)=>{
  user_obj.Login_Check(req,res)
})

router.use('/newuser',(req,res)=>{
   user_obj.Create_Account(req,res)
})
router.use('/dashboard',(req,res)=>{
   if(req.session.user_emailid !=null )
   {
      res.render('Dashboard')
      res.end()
   }
   else{
      res.render('Login',{message:"login here..."})
      res.end()
   }
})
router.use('/logout',(req,res)=>{
   req.session.destroy()
   res.render('Login',{message:"logout successfully"})
   res.end()
})
router.use('/change_password',(req,res)=>{
   
})
module.exports=router



// db.teacher.insertOne({name:"mamta",age:21,contact:[{email:"mamta@gmail.com",phone:97434788747}]});
// db.teacher.insertOne({name:"mamta",age:21,contact:{email:"mamta@gmail.com",phone:97434788747} ,address:{street:"chd",state:"p"} ,previous:[{addres:[{state:"punjab",
// db.teacher.updateMany({},{$set:{designation:"teacher"}})
// db.teacher.updateOne({name:"mamta"},{$set:{"subject taught":["english","hindi"]}})
// db.teacher.findOne({name:"mamta"})["contact"]
// db.collections1.insertMany({_id:0,name:"mamta"},{_id:1,name:"anter"})
//id cannot updated byourseleves
// db.teacher.findOne({"contact.email":"mamta@gmail.com"}
// db.teacher.find({"subject taught":["english","hindi"]})