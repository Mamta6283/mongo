const mongo_connect=require('../Database_connect')


class User
{
    user_model=null
    constructor()
    {
        this.user_model=mongo_connect.model('user_data',new mongo_connect.Schema({},{strict:false}),'user')
    }
   async Login_Check(req,res)
       {
          if(req.mehtod==='GET')
          {
            res.render('Login')
            res.end()
          }  
          else{
                 const record =await this.user_model.findOne({email:req.body.email,password:req.body.password})
                 if(record)
                 {
                   req.session.user_emailid=req.body.email
                   res.redirect('/dashboard')
                 }
                 else{
                    res.render('Login',{message:"incorrect credentials"})
                    res.end()
                 }   
          }
       } 
  async  Create_Account(req,res)
    {
     if(req.mehtod==='GET')
     {
        res.render('NewUser')
        res.end()
     }
     else{
       const user_record=new this.user_model(
        {
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            gender:req.body.gender,
            address:req.body.address
     })
     await user_record.save()
     
     res.render('NewUser',{message:"signup successfully"})
     res.end()
     }
    }

    Change_Password(req,res)
    {
      if(req.mehtod==='GET')
      {
        res.render('ChangePassword')
        res.end()
      }
      else{
           
      }
    }
}


const obj=new User()
module.exports=obj