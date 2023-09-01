import express from 'express';

const app = express();
import multer from "multer";
import path from "path";
// connectDB();

const router =express.Router();

import mongoose from "mongoose"
// import connectDB from './appdb.js';
const drivinglicenseSchema=mongoose.Schema(
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

const Drivinglicense =mongoose.model("Drivinglicense",drivinglicenseSchema);
drivinglicenseSchema.plugin(Drivinglicense);


const Storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
     cb(null,file.originalname);
    },
});

const upload = multer({
    storage: Storage,
   
}).single('testImage')
const driving={
drivinglicense:[{
    name:"Devipriya",
    image:{
        data:"https://e7.pngegg.com/pngimages/457/405/png-clipart-black-and-blue-card-art-car-driver-s-license-computer-icons-driving-driver-text-logo.png",
contentType:"image/png"
    },

},


]
}
router.get('/',(req,res)=>{
    res.send(driving);
})



router.get('/:id',(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            console.log(err)
        }
        else{
        Drivinglicense.findById({_id:req.params.id},{
            name:req.body.name,
            image:{
                data:req.file.filename,
                contentType:'image/png'
            },   
         
            })
          
            .then(result=>{
                res.status(200).json({
                   profile:result
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
            const newImage = new Drivinglicense({
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
         Drivinglicense.findOneAndUpdate({_id:req.params.id},{
                name:req.body.name,
                image:{
                    data:req.file.filename,
                    contentType:'image/png'
                },   
                
            })
          
            .then(result=>{
                res.status(200).json({
                    updated_drivinglicence:result       
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
          Drivinglicense.deleteOne({_id:req.params.id},{
                name:req.body.name,
                image:{
                    data:req.file.filename,
                    contentType:'image/png'
                },   
              
            })
          
            .then(result=>{
                res.status(200).json({
                   deleted_drivinglicense:result       
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
Drivinglicense.deleteMany({}).then((result) => {
             res.send(result);
         })
     });
    

export default router;
// const port=4000;
// app.listen(port,()=>{
//     console.log(`server is running at ${port}`);
//     console.log(driving);
// });