
const { name } = require('ejs');
const mongo_connect=require('../Database_connect')

class Employee_
{
    emp_model=null
    constructor()
    {
        this.emp_model=mongo_connect.model('emp_store',new mongo_connect.Schema({},{strict:false}),'Employee')
    }
    Add_Record(req,res)
    {
    
        //    const emp=mongo_connect.model('emp',new mongo_connect.Schema({},{strict:false}),'Employee')
           const emp_data=new this.emp_model(
            { 
            name:req.body.name,
            mobile:req.body.mobile,
            address:req.body.address
           });
           emp_data.save().then(()=>
            { 
            res.render('Home',{message:req.body.name+"record save successfully"})
            res.end()  
           }).catch(()=>{
            res.render('Home',{message:"record not save"})
            res.end() 
           })      
    }

// Delete_Emp(req,res){
//      if(req.method==='GET')
//      {
//        res.render('Delete')     
//        res.end()   
//      }
//      else{
//         // const emp_model=mongo_connect.model('emp_store',new mongo_connect.Schema({},{strict:false}),'Employee')
//         this.emp_model.findOne({name:req.body.name}).then((record)=>
//         {
//             if(record)
//             {
//                 // this.emp_model.findOneAndDelete({name:req.body.name}).then(()=>
//                 //     {
//                 //         res.render('Delete',{message:req.body.name+'Record delete successfully'})
//                 //         res.end()
            
//                 //     })

//                 return this.emp_model.findOneAndDelete({name:req.body.name})
//             }
//             else{
//                 // return Promise.reject(req.body.name,'not existjin our data base')
//                 throw new Error(req.body.name+'no exist in our data base')

//             }

//         })
//         .then(()=>
//                 {
//                     res.render('Delete',{message:req.body.name+'Record delete successfully'})
//                     res.end()
        
//                 })

//       .catch((err)=>{
//             res.render('Delete',{message:err.message})
//             res.end()
//         })

//      }
// }                                                                                                                                   

Delete_Emp(req,res){
    if(req.method==='GET')
    {
      res.render('Delete')     
      res.end()   
    }
    else{
       
       this.emp_model.findOne({name:req.body.name}).then((record)=>
       {
           if(record)
           {
              
               return this.emp_model.findOneAndDelete({name:req.body.name})
           }
           else{
             
               throw new Error(req.body.name+'no exist in our data base')

           }

       })
       .then(()=>
               {
                   res.render('Delete',{message:req.body.name+'Record delete successfully'})
                   res.end()
       
               })

     .catch((err)=>{
           res.render('Delete',{message:err.message})
           res.end()
       })

    }
}


// Display_Emp(req,res)
// {
//     this.emp_model.find({}).then((data)=>
//         {
//         res.render('Display',{record:data})
//         res.end()
//     }).catch((err)=>
//     {
//         res.send(err.message)
//         res.end()
//     })


// }
async Display_Emp(req,res)
{
    const data=await this.emp_model.find({})
    res.render('Display',{record:data})
    res.end()
}
//  Search_Emp(req,res)
// {
//     if(req.method==='GET')
//     {
//          res.render('Search')
//          res.end()
//     }
//     else{
//         const emp_name=req.body.name
//         this.emp_model.find({name:emp_name}).then((data)=>{
//             res.render('Search',{record:data})
//             res.end()
//         })
//     }
// }

async Search_Emp(req,res)
{
    if(req.method==='GET')
    {
         res.render('Search')
         res.end()
    }
    else{
        
       const data=await this.emp_model.find({name:req.body.name})
            res.render('Search',{record:data})
            res.end()
    
    }
}

async Update_Emp(req,res)
{
    if(req.method==='GET')
    {
          res.render('Update_Record')
          res.end()
    }
    else 
    {
       const {name,mobile,address}=req.body
       
      /*  const nam=req.body.name
        const mob=req.body.mb
        const adrs=req.body.address  */
        const record=await this.emp_model.findOne({name:name});
        if(record)
        {
             res.render('Update_Record',{message:"Record Found",name:record.name,mobile:record.mobile,address:record.address})
             res.end()

           
        }
        else 
        {
            res.render('Update_Record',{message:'Name not Exits To Update the Mobile & Address Record'})
            res.end()
        }
    }
}

// async Update_Emp_Final(req,res)

// {
//     if(req.method==='GET')
//     {
//         res.render('Update_Record')
//         res.end()
//     }
//     else{
//     // const {name,mobile,address}=req.body
//     const name=req.body.name                 //(you can write something like this )
//     const mobile=req.body.mobile
//     const address=req.body.address

//    const record=await this.emp_model.findOne({name:req.body.name})
//    if(record)
//    {
//        const update_data={
//         name:name,
//         mobile:mobile,
//         address:address` 
//        }



//        const myquery={name:name}
//      await  this.emp_model.findOneAndUpdate(myquery,{$set:update_data},{new:true,useFindAndModify:false})
//        res.render('Update_Record',{message:"record updated successfully"})
//        res.end() 
//    }
//    else{
//            res.render('Update_Record',{message:"name not exist to update the mobile and address record"})
//            res.end() 
//    }
    
// }
// }

     

async Update_Emp_final(req,res)
{
              const {name,mobile,address}=req.body
              
              const update_data={
                  mobile:mobile,
                  address:address
          }
          
          const myquery={name:name}
          await this.emp_model.findOneAndUpdate(myquery,{$set:update_data},{new:true,useFindAndModify:false})
          res.render('Update_Record',{message:'Record Updated Successfully'})
          res.end()
}

}




const obj=new Employee_()
module.exports=obj