import express from "express";
import multer from "multer";
import mongoose from "mongoose";
const router =express.Router();
// import connectDB from "./appdb.js";
// connectDB();
const app=express();
app.use(express.json());
const Storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
     cb(null,file.originalname);
    },
});

const upload = multer({
    storage: Storage,
   
}).single('testImage')
const goobro=
    {
    Full_Name:"Devipriya",
    Gender:"Female",
    Date_of_Birth:"08/05/2001",
    Email_Id:"devipriya@gmail.com"
    }

const goobroprofileSchema=mongoose.Schema(
    {
    Full_Name:{
    type:String,

},
Gender:{
    type:String,
   required:true,
},
Date_of_Birth:{
    type:String,
   required:true,
},
Email_Id:{
    type:String,
   required:true,
},

     })

const Goobroprofile =mongoose.model("Goobroprofile",goobroprofileSchema);
goobroprofileSchema.plugin(Goobroprofile);
app.use(express.json());
router.post('/',(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            console.log(err)
        }
        else{
            const newImage = new Goobroprofile({
                Full_Name:req.body.Full_Name,
                Gender:req.body.Gender,
                Date_of_Birth:req.body.Date_of_Birth,
                Email_Id:req.body.Email_Id,
            })
            newImage.save()
        .then(()=>res.send('successfully uploaded')).catch(err=>console.log(err))
        }
    })
    
})
router.put('/:id',(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            console.log(err)
        }
        else{
            Goobroprofile.findOneAndUpdate({_id:req.params.id},{
            Full_Name:req.body.Full_Name,
            Gender:req.body.Gender,
            Date_of_Birth:req.body.Date_of_Birth,
            Email_Id:req.body.Email_Id,
            })
          
            .then(result=>{
                res.status(200).json({
                    updated_documentlist:result       
                 })
            })
            .catch(err=>{
                console.log(err)
                res.status(500).json({
                    error:err
                })
            })
        
        }
    })
    
})
router.delete('/:id',(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            console.log(err)
        }
        else{
            Goobroprofile.deleteOne({_id:req.params.id},{
            Full_Name:req.body.Full_Name,
            Gender:req.body.Gender,
            Date_of_Birth:req.body.Date_of_Birth,
            Email_Id:req.body.Email_Id,
            })
          
            .then(result=>{
                res.status(200).json({
                   deleted_documentlist:result       
                 })
            })
            .catch(err=>{
                console.log(err)
                res.status(500).json({
                    error:err
                })
            })
        
        }
    })

    
})


router.delete("/",async(req,res)=>{
  Goobroprofile.deleteMany({}).then((result) => {
             res.send(result);
         })
     });
    

export default router;






