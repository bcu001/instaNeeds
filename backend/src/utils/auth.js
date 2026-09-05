import jwt from 'jsonwebtoken'
import ENV from "../config/env.js"
import User from "../models/user.model.js";

export const genAccessToken = (user, session)=>{
    if(!user) return null;
    return jwt.sign({
        userId:user._id,
        sessionId:session._id
    }, ENV.JWT_ACCESS_SECRET, {expiresIn:ENV.ACCESS_TOKEN_EXPIRE_IN})
}

export const genRefreshToken = (user, sessionId)=>{
    if(!user) return null;
    return jwt.sign({
        userId:user._id,
        sessionId
    }, ENV.JWT_REFRESH_SECRET, {expiresIn:ENV.REFRESH_TOKEN_EXPIRE_IN})
}

export const getUserFromRefreshToken = async(token)=>{
    if(!token) return null;
    const decoded = jwt.verify(token, ENV.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.userId);
    return user;
}

export const getUserFromAccessToken = async(token)=>{
    if(!token) return null;
    const decoded = jwt.verify(token, ENV.JWT_ACCESS_SECRET);
    const user = await User.findById(decoded.userId);
    return user;
}