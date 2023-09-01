import express from "express";

import mongoose from "mongoose";
// import connectDB from "./appdb.js";
// connectDB();
const router =express.Router();
const app=express();
app.use(express.json());
const platenumber=[
    { 
   platenumber:"345667"
    },
    
]
const platenumberSchema=mongoose.Schema(
    {
        platenumber:{
            type:String,
           required:true,
        },
     

     })

const Platenumber =mongoose.model("Platenumber",platenumberSchema);
platenumberSchema.plugin(Platenumber);
// app.use(express.json());
router.get("/",(req,res)=>{
    try{
        res.status(200).send(platenumber);
    }catch(error)
    {
        res.json({message:"unable to create"});

    }

});
router.post("/",async(req,res)=>{
    try{
        const details={
            platenumber:req.body.platenumber,
           
            };
        console.log(details);
        const plate=new Platenumber(details);
const platenumberCreated=await plate.save();
if(platenumberCreated){
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
 Platenumber.findOneAndUpdate({_id:req.params.id},{
        $set:{
            platenumber:req.body.platenumber,
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
        Platenumber.findByIdAndRemove({_id:req.params.id},{
            $set:{
                platenumber:req.body.platenumber,
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
            Platenumber.deleteMany({}).then((result) => {
                     res.send(result);
                 })
             });
            
        
        export default router;
        // const port=4000;
        // app.listen(port,()=>{
        //     console.log(`server is running at ${port}`);
        //     console.log(platenumber);
        // });