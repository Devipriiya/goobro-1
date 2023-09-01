import express from 'express';

const app = express();
import multer from "multer";
import path from "path";
// connectDB();

const router =express.Router();

import mongoose from "mongoose"
// import connectDB from './appdb.js';
const profilephotoSchema=mongoose.Schema(
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

const Profilephoto =mongoose.model("Profilephoto",profilephotoSchema);
profilephotoSchema.plugin(Profilephoto);


const Storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
     cb(null,file.originalname);
    },
});

const upload = multer({
    storage: Storage,
   
}).single('testImage')
// const profile={
// profilephoto:[{
//     name:"Devipriya",
//     image:{
//         data:"https://w7.pngwing.com/pngs/722/101/png-transparent-computer-icons-user-profile-circle-abstract-miscellaneous-rim-account.png",
// contentType:"image/png"
//     },

// },
3

// ]
// }
router.get('/',(req,res)=>{
    res.send(profile);
})



router.get('/:id',(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            console.log(err)
        }
        else{
           Profilephoto.findById({_id:req.params.id},{
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
            const newImage = new Profilephoto({
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
         Profilephoto.findOneAndUpdate({_id:req.params.id},{
                name:req.body.name,
                image:{
                    data:req.file.filename,
                    contentType:'image/png'
                },   
                
            })
          
            .then(result=>{
                res.status(200).json({
                    updated_profile:result       
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
           Profilephoto.deleteOne({_id:req.params.id},{
                name:req.body.name,
                image:{
                    data:req.file.filename,
                    contentType:'image/png'
                },   
              
            })
          
            .then(result=>{
                res.status(200).json({
                   deleted_profile:result       
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
Profilephoto.deleteMany({}).then((result) => {
             res.send(result);
         })
     });
    

export default router;
// const port=4000;
// app.listen(port,()=>{
//     console.log(`server is running at ${port}`);
//     console.log(profile);
// });