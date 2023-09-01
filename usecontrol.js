import express from "express";
import bcrypt from 'bcrypt';

import otpGenerator from 'otp-generator';

import dotenv from "dotenv";

import connectDB from "./appdb.js";

import Otp from "./otpmodel.js";
import User from "./userotpmodel.js";

const app=express();
dotenv.config();
app.use(express.json());
connectDB();
User
Otp
app.post('/signup',async(req,res)=>{
	const user=await Otp.findOne({
		number:req.body.number
	});
	if(user) return res.status(400).send("User already registered!");
	const OTP =otpGenerator.generate(6,{
		digits:true,alphabets:false,upperCase:false,specialChars:false
	});
	const number=req.body.number;
	console.log(OTP);
	
	const otp=new Otp({number:number,otp:OTP});

	const salt =await bcrypt.genSalt(10)
	otp.otp=await bcrypt.hash(otp.otp,salt);
	const result=await otp.save();
	console.log(result);
	return res.status(200).send("Otp send successfully!");
});
app.post('/signup/verify',async(req,res)=>{
	const otpHolder=await Otp.find({
		number:req.body.number
	});
	if(otpHolder.length===0)return res.status(400).send("expired otp!");
	const rightOtpFind=otpHolder[otpHolder.length-1];
	const validUser=await bcrypt.compare(req.body.otp,rightOtpFind.otp);
	if(rightOtpFind.number===req.body.number && validUser){
		// const user=new Userotp(_.pick(req.body,["number"]));
		const token=Otp.generateJWT;
		
		const OTPDelete=await Otp.deleteMany({
			number:rightOtpFind.number
		});
		return res.status(200).send({
			message:"User Registration successfull!",
			token:token,
		
		});

	}else{
		return res.status(400).send("Your OTP was wrong!")
	}

})
const port=3000;
app.listen(port,()=>{
    console.log(`server is running at ${port}`);
});