import mongoose from "mongoose"

const sessionSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true, "user is required"]
    },
    refreshTokenHash:{
        type:String,
        required:[true, "refresh token hash is requried"]
    },
    ip:{
        type:String,
        required:[true,"ip is requried"]
    },
    userAgent:{
        type:String,
        required:[true, "user agent is requried"]
    },
    revoked:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

const Session = mongoose.model("Session", sessionSchema);
export default Session;