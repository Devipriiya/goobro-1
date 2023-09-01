import mongoose from "mongoose";

const otpSchema =mongoose.Schema({
  number: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: { type: Date, default: Date.now, index: { expires: 2000 } }

    // After 5 minutes it deleted automatically from the database
}, )
const Otp=mongoose.model("otp",otpSchema);
export default Otp;