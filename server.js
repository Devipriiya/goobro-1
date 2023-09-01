import express from "express";
import connectDB from "./appdb.js";
import document from "./document.js";
import drivinglicense from "./drivinglicense.js";
import licensenumber from "./licencenumber.js";
import licenseplate from "./licenceplate.js";
import pancard from "./pancard.js";
import profile from "./profile.js";
import profilephoto from "./profilephoto.js";
import registrationcertificate from "./registrationcertificate.js";
import earn from "./earngobro.js";

connectDB();

const app=express();
app.use(express.json());
app.use('/document',document);
app.use('/drivinglicense',drivinglicense);
app.use('/licensenumber',licensenumber);
app.use('/licenseplate',licenseplate);
app.use('/pancard',pancard);
app.use('/profile',profile);
app.use('/profilephoto',profilephoto);
app.use('/registrationcertificate',registrationcertificate);
app.use('/earn',earn);
const port=5000;
app.listen(port,()=>{
    console.log(`server is running at ${port}`);
 
});