import mongoose from "mongoose";
import jwt from 'jsonwebtoken';

const userSchema =mongoose.Schema({
    number: {
        type: String,
        required: true
    }
}, { timestamps: true });

userSchema.methods.generateJWT = function () {
    const token = jwt.sign({
        _id: this._id,
        number: this.number
    }, process.env.TOKEN_KEY, { expiresIn: "7d" });
    return token
}
const User=mongoose.model("User",userSchema);
export default User;