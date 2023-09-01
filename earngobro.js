import express from "express";
import multer from "multer";
import mongoose from "mongoose";
const router =express.Router();
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
const earn={
    earnlist:[
        {
            purpose:"Rides",
            image:{
                data:"https://www.pngmart.com/files/15/Ford-Mustang-Convertible-Car-Green-Transparent-PNG.png",
        contentType:"image/png"
            },
            type:"car owner",
            description:"Vechicle: You have a car that you wish to drive or employ others to drive"
        },
        {
            purpose:"Rides",
            image:{
                data:"https://assets.stickpng.com/images/580b585b2edbce24c47b2d00.png",
        contentType:"image/png"
            },
            type:"MotorBike(2 Wheeler)",
            description:"Vechicle: You wish to drive a motorcycle or scooter"
        },
        {
            purpose:"Rides",
            image:{
                data:"https://w7.pngwing.com/pngs/956/330/png-transparent-yellow-and-green-re-bajaj-compact-auto-rickshaw-bajaj-auto-auto-rickshaw-car-three-wheeler-auto-rickshaw-india-mode-of-transport-public-transport.png",
        contentType:"image/png"
            },
            type:"Auto Rickshaw",
            description:"Vechicle: You wish to drive an Auto or Rickshaw"
        },
    ]
}
const earnSchema=mongoose.Schema(
    {
        purpose:{
            type:String,
            required:true,
        },
        image:{
            data:String,
            contentType: String
        },
        type:{
            type:String,
            required:true,
        },
        description:{
            type:String,
            required:true,
        },
        isDeleted:{
            type:Boolean,
            default:false
        }

     })

const Earn =mongoose.model("Earn",earnSchema);

router.get('/', async (req, res) => {

    let filter = {isDeleted:false}

    if(req.query.purpose){
        filter.purpose = req.query.purpose
    }

    let list = await Earn.find(filter)
    console.log("successfully")
    res.send(list);
})

router.get("/:id", async(req, res) => {
    try {
        let earnlist = await Earn.find({_id:req.params.id,isDeleted:false})
//     .
        
        if (earnlist) {
            res.json(earnlist);
        } else {
            res.status(404).json({ message: "Not found" });
        }
    } catch (error) {
        res.json({ message: 505 });
    }
});


//update
router.post('/',(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            console.log(err)
        }
        else{
            const newImage = new Earn({
                image:{
                    data:req.file.filename,
                    contentType:'image/png'
                },  
                purpose:req.body.purpose,
                type:req.body.type,
                description:req.body.description,
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
          Earn.findOneAndUpdate({_id:req.params.id},{
            image:{
                data:req.file.filename,
                contentType:'image/png'
            },  
            purpose:req.body.purpose,
            type:req.body.type,
            description:req.body.description,
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
           Earn.deleteOne({_id:req.params.id},{
            image:{
                data:req.file.filename,
                contentType:'image/png'
            },  
            purpose:req.body.purpose,
            type:req.body.type,
            description:req.body.description,
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
  Earn.deleteMany({}).then((result) => {
             res.send(result);
         })
     });
    

export default router;
        // const port=4000;
        // app.listen(port,()=>{
        //     console.log(`server is running at ${port}`);
        //     console.log(pancard);
        // });