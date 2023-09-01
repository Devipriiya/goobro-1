import express from 'express';

const app = express();
import multer from "multer";
import path from "path";
// connectDB();

const router =express.Router();

import mongoose from "mongoose"
// import connectDB from './appdb.js';
const registrationSchema=mongoose.Schema(
    {
     name:{
            type:String,
           required:true,
        },
   
image:{
    data:String,
    contentType: String
},


           
     })

const Registration =mongoose.model("Registration",registrationSchema);
registrationSchema.plugin(Registration);


const Storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
     cb(null,file.originalname);
    },
});

const upload = multer({
    storage: Storage,
   
}).single('testImage')
const register={
registration:[{
    name:"Devipriya",
    image:{
        data:"https://static.thenounproject.com/png/17402-200.png",
contentType:"image/png"
    },

},


]
}
router.get('/',(req,res)=>{
    res.send(register);
})



router.get('/:id',(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            console.log(err)
        }
        else{
        Registration.findById({_id:req.params.id},{
            name:req.body.name,
            image:{
                data:req.file.filename,
                contentType:'image/png'
            },   
         
            })
          
            .then(result=>{
                res.status(200).json({
                   registration:result
                })
            })
            .catch(err=> {
            console.log(err);
            res.status(505).json({
                error:err
            })
            }
          )
        }
    })
    
})

router.post('/',(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            console.log(err)
        }
        else{
            const newImage = new Registration({
                name:req.body.name,
                image:{
                    data:req.file.filename,
                    contentType:'image/png'
                },   
               
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
        Registration.findOneAndUpdate({_id:req.params.id},{
                name:req.body.name,
                image:{
                    data:req.file.filename,
                    contentType:'image/png'
                },   
                
            })
          
            .then(result=>{
                res.status(200).json({
                    updated_registration:result       
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
          Registration.deleteOne({_id:req.params.id},{
                name:req.body.name,
                image:{
                    data:req.file.filename,
                    contentType:'image/png'
                },   
              
            })
          
            .then(result=>{
                res.status(200).json({
                   deleted_registration:result       
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
Registration.deleteMany({}).then((result) => {
             res.send(result);
         })
     });
    

export default router;
// const port=4000;
// app.listen(port,()=>{
//     console.log(`server is running at ${port}`);
//     console.log(register);
// });