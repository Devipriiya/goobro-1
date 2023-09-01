import express from 'express';

const app = express();
import multer from "multer";
import path from "path";
// connectDB();

const router =express.Router();

import mongoose from "mongoose"
// import connectDB from './appdb.js';
const pancardSchema=mongoose.Schema(
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

const Pancard =mongoose.model("Pancard",pancardSchema);
pancardSchema.plugin(Pancard);


const Storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
     cb(null,file.originalname);
    },
});

const upload = multer({
    storage: Storage,
   
}).single('testImage')
const pan={
drivinglicense:[{
    name:"Devipriya",
    image:{
        data:"https://lh3.googleusercontent.com/k0diJVt4V6dJTmUn2TSL-fkka6wzQWCY3GOrmCZ4ICbXJSas3tLbaRdXF7jSxAfrXCc",
contentType:"image/png"
    },

},


]
}
router.get('/',(req,res)=>{
    res.send(pan);
})



router.get('/:id',(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            console.log(err)
        }
        else{
        Pancard.findById({_id:req.params.id},{
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
            const newImage = new Pancard({
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
         Pancard.findOneAndUpdate({_id:req.params.id},{
                name:req.body.name,
                image:{
                    data:req.file.filename,
                    contentType:'image/png'
                },   
                
            })
          
            .then(result=>{
                res.status(200).json({
                    updated_pancard:result       
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
          Pancard.deleteOne({_id:req.params.id},{
                name:req.body.name,
                image:{
                    data:req.file.filename,
                    contentType:'image/png'
                },   
              
            })
          
            .then(result=>{
                res.status(200).json({
                   deleted_pancard:result       
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
Pancard.deleteMany({}).then((result) => {
             res.send(result);
         })
     });
    

export default router;
// const port=4000;
// app.listen(port,()=>{
//     console.log(`server is running at ${port}`);
//     console.log(driving);
// });