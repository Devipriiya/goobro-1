import express from "express";

import mongoose from "mongoose";
const router =express.Router();
// import connectDB from "./appdb.js";
// connectDB();
const app=express();
app.use(express.json());
const licence=[
    { 
    licence:"6743853",
    Dateofbirth:"8/2/2001"
    },
    
]
const licenceSchema=mongoose.Schema(
    {
        licence:{
            type:String,
           required:true,
        },
        Dateofbirth:{
            type:String,
           required:true,
        },

     })

const Licence =mongoose.model("Licence",licenceSchema);
licenceSchema.plugin(Licence);
// app.use(express.json());
router.get("/",(req,res)=>{
    try{
        res.status(200).send(licence);
    }catch(error)
    {
        res.json({message:"unable to create"});

    }

});
router.post("/",async(req,res)=>{
    try{
        const details={
            licence:req.body.licence,
            Dateofbirth:req.body.Dateofbirth
            
        };
        console.log(details);
        const licence=new Licence(details);
const licenceCreated=await licence.save();
if(licenceCreated){
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
   Licence.findOneAndUpdate({_id:req.params.id},{
        $set:{
            licence:req.body.licence,
            Dateofbirth:req.body.Dateofbirth
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
        Licence.findByIdAndRemove({_id:req.params.id},{
            $set:{
               
                licence:req.body.licence,
                Dateofbirth:req.body.Dateofbirth
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
            Licence.deleteMany({}).then((result) => {
                     res.send(result);
                 })
             });
            
        
        export default router;
        // const port=4000;
        // app.listen(port,()=>{
        //     console.log(`server is running at ${port}`);
        //     console.log(licence);
        // });