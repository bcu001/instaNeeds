import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import ENV from "../config/env.js";
import apiResponse from "../utils/apiResponse.js";
import userNormalization from "../utils/userNormalization.js";
import { genAccessToken, genRefreshToken, getUserFromAccessToken } from "../utils/auth.js";
import Session from "../models/session.model.js";
import mongoose from "mongoose";

const refreshCookieOptions = {
    httpOnly: true,
    secure: ENV.CLIENT_URL.startsWith("https://"),
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
};

export const getCurrentUser = async (req, res) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }
        const user = await getUserFromAccessToken(token);
        if (!user) return apiResponse(res, "Unauthorized", 401)

        return apiResponse(res, "user validated", 200,{user:userNormalization(user)});
    } catch (error) {
        console.error("Error at getCurrentUser", error)
        return apiResponse(res, "Unauthorized", 401)
    }
}

export const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) return apiResponse(res, "User already exists", 409)
        
        const salt = await bcrypt.genSalt(10);
        const hassPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create([{ name, email, password: hassPassword }]);
        return apiResponse(res,"User created successfully", 201, {user:userNormalization(newUser[0])});
    } catch (error) {
        console.error("Error at signup",error);
        return apiResponse(res, "Error at sign-up",500);
    }
}

export const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email }).select("+password");
        if (!existingUser) return apiResponse(res, "No match found for data", 404)

        const validPassword = await bcrypt.compare(password, existingUser.password);
        if (!validPassword) return apiResponse(res, "password is wrong", 401)
        
        const sessionId = new mongoose.Types.ObjectId();
        const refreshToken = genRefreshToken(existingUser,sessionId);
        const salt = await bcrypt.genSalt(10);
        const refreshTokenHash = await bcrypt.hash(refreshToken,salt);
        const session = await Session.create({
            _id: sessionId,
            userId:existingUser._id,
            refreshTokenHash,
            ip:req.ip,
            userAgent:req.headers["user-agent"]
        })
        const accessToken = genAccessToken(existingUser, session);
        res.cookie("refreshToken", refreshToken, refreshCookieOptions)
        return apiResponse(res,"User signin successfully", 200, {accessToken, user:userNormalization(existingUser)});

    } catch (error) {
        console.error("Error at signup",error);
        return apiResponse(res, "Error at sign-in",500);
    }
}

export const signOut = async (req, res) => {
    try{
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return apiResponse(res,"no refresh token found",400);
        const decoded = jwt.verify(refreshToken, ENV.JWT_REFRESH_SECRET);
        const session = await Session.findOne({
            _id: decoded.sessionId,
            revoked:false
        })
        if(!session) return apiResponse(res,"invalid refresh token",400)
        session.revoked = true,
        await session.save()
        res.clearCookie("refreshToken");
        return apiResponse(res, "signout success",200)
    } catch (error){
        console.error("Error at signOut",error);
        return apiResponse(res,"Error at signOut",500);
    }
}

export const refreshToken = async(req,res)=>{
    try{
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return apiResponse(res,"refresh token not found", 401);

        const decoded = jwt.verify(refreshToken,ENV.JWT_REFRESH_SECRET)
        const session = await Session.findOne({
            _id: decoded.sessionId,
            revoked:false
        })

        if(!session) return apiResponse(res,"session not found",401);
        const valid = await bcrypt.compare(refreshToken, session.refreshTokenHash);

        if(!valid) return apiResponse(res,"refresh token is invalid",401);

        // rotate refreshToken
        const newRefreshToken = genRefreshToken({_id:decoded.userId},session._id);
        const salt = await bcrypt.genSalt();
        const newRefreshTokenHash = await bcrypt.hash(newRefreshToken,salt);
        session.refreshTokenHash = newRefreshTokenHash;
        await session.save();
        res.cookie("refreshToken", newRefreshToken, refreshCookieOptions)

        const accessToken = genAccessToken({_id:decoded.userId},session);
        return apiResponse(res,"Access token refreshed",200,{accessToken})
    } catch(error){
        console.error("Error at refreshToken",error);
        return apiResponse(res,"Refresh token is invalid or expired",401);
    }
}

export const signoutAll = async(req,res)=>{
    try{
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return apiResponse(res,"refresh token not found", 400);    

        const decoded = jwt.verify(refreshToken, ENV.JWT_REFRESH_SECRET);
        await Session.updateMany({
            userId:decoded.userId,
            revoked:false
        },{revoked:true});
        res.clearCookie("refreshToken");
        return apiResponse(res,"signout from all devices",200);
    } catch (error){
        console.error("Error at signoutAll",error);
        return apiResponse(res,"Error at signoutAll",500);
    }
}