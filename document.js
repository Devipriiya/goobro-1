import express from 'express';

const app = express();
import multer from "multer";
import path from "path";
// connectDB();

const router =express.Router();

import mongoose from "mongoose"
// import connectDB from './appdb.js';
const documentSchema=mongoose.Schema(
    {

   
image:{
    data:String,
    contentType: String
},
document:{
    type:String,
   required:true,
},
note:{
    type:String,
    required:true,
},
isDeleted:{
    type:Boolean,
    default:false
}

           
     })

const Document =mongoose.model("Document",documentSchema);
documentSchema.plugin(Document);


const Storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
     cb(null,file.originalname);
    },
});

const upload = multer({
    storage: Storage,
   
}).single('testImage')
const documents={
documentlist:[{
    image:{
        data:"https://w7.pngwing.com/pngs/722/101/png-transparent-computer-icons-user-profile-circle-abstract-miscellaneous-rim-account.png",
contentType:"image/png"
    },
   document:"Profile Photo",
   note:"Recommended next step"
},
{
    image:{
        data:"https://e7.pngegg.com/pngimages/457/405/png-clipart-black-and-blue-card-art-car-driver-s-license-computer-icons-driving-driver-text-logo.png",
contentType:"image/png"
    },
    document:"Driving Licence-Front",
    note:"Get Started"
},
{
    image:{
     data:"https://lh3.googleusercontent.com/k0diJVt4V6dJTmUn2TSL-fkka6wzQWCY3GOrmCZ4ICbXJSas3tLbaRdXF7jSxAfrXCc",
contentType:"image/png"
    },
    document:"PAN Card",
    note:"Get Started"
},{
    image:{
     data:"https://static.thenounproject.com/png/17402-200.png",
contentType:"image/png"
    },
    document:"Registration Certificate(RC)",
    note:"Get Started"
},
{
    image:{
     data:"https://cdn-icons-png.flaticon.com/512/4599/4599098.png",
contentType:"image/png"
    },
    document:"Vechicle Insurance",
    note:"Get Started"
},
{
    image:{
     data:"https://cdn2.iconfinder.com/data/icons/miscellaneous-12-solid/128/bankbook_account_deposit_passbook_-15-512.png",
contentType:"image/png"
    },
    document:"Bank Passbook",
    note:"Get Started"
},

]
}
router.get('/', async (req, res) => {

    let filter = {isDeleted:false}

    if(req.query.note){
        filter.note = req.query.note
    }

    let list = await Document.find(filter)
    console.log("successfully")
    res.send(list);
})

router.get("/:id", async(req, res) => {
    try {
        let doc = await Document.find({_id:req.params.id,isDeleted:false})
//     .
        
        if (doc) {
            res.json(doc);
        } else {
            res.status(404).json({ message: "Not found" });
        }
    } catch (error) {
        res.json({ message: 505 });
    }
});



router.post('/',(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            console.log(err)
        }
        else{
            const newImage = new Document({
                image:{
                    data:req.file.filename,
                    contentType:'image/png'
                },   
                document:req.body.document,
                note:req.body.note,
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
          Document.findOneAndUpdate({_id:req.params.id},{
                image:{
                    data:req.file.filename,
                    contentType:'image/png'
                },   
                document:req.body.document,
                note:req.body.note,
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
           Document.deleteOne({_id:req.params.id},{
                image:{
                    data:req.file.filename,
                    contentType:'image/png'
                },   
                document:req.body.document,
                note:req.body.note,
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
  Document.deleteMany({}).then((result) => {
             res.send(result);
         })
     });
    

export default router;
// const port=4000;
// app.listen(port,()=>{
//     console.log(`server is running at ${port}`);
//     console.log(documents);
// });