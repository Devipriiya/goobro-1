import express from "express";

import mongoose from "mongoose";
// import connectDB from "./appdb.js";
// connectDB();
const app=express();
app.use(express.json());
const pancard=[
    { 
    pancardnumber:"748950"
    },
    
]
const pancardnumberSchema=mongoose.Schema(
    {
        pancardnumber:{
            type:String,
           required:true,
        }

     })

const Pancardnumber =mongoose.model("Pancardnumber",pancardnumberSchema);
pancardnumberSchema.plugin(Pancardnumber);
// app.use(express.json());
router.get("/",(req,res)=>{
    try{
        res.status(200).send(pancard);
    }catch(error)
    {
        res.json({message:"unable to create"});

    }

});
router.post("/",async(req,res)=>{
    try{
        const details={
            pancardnumber:req.body.pancardnumber
            
        };
        console.log(details);
        const pancardnumber=new Pancardnumber(details);
const pancardnumberCreated=await pancardnumber.save();
if(pancardnumberCreated){
    console.log("created");
res.status(201).json({message:"successfully created"});
}
else{
    res.status(401);
    throw new error("not found ");
}
}catch(err){
    return res.status(500).json({message:err.message});
}}
);
//update
router.put('/:id',(req,res)=>{
    console.log(req.params.id);
   Pancardnumber.findOneAndUpdate({_id:req.params.id},{
        $set:{
            pancardnumber:req.body.pancardnumber
        }
    })
    .then(result=>{
        res.status(200).json({
            updated_userDetails:result       
         })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
    })
    //delete
    router.delete('/:id',(req,res)=>{
        console.log(req.params.id);
        Pancardnumber.findByIdAndRemove({_id:req.params.id},{
            $set:{
               
                pancardnumber:req.body.pancardnumber
            }
        })
        .then(result=>{
            res.status(200).json({
                Deleted_userDetails:result       
             })
        })
        .catch(err=>{
            console.log(err)
            res.status(500).json({
                error:err
            })
        })
        })
    




        router.delete("/",async(req,res)=>{
            Pancardnumber.deleteMany({}).then((result) => {
                     res.send(result);
                 })
             });
            
        
        export default router;
        // const port=4000;
        // app.listen(port,()=>{
        //     console.log(`server is running at ${port}`);
        //     console.log(pancard);
        // });