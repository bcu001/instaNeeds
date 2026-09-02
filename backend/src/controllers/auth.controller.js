import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import ENV from "../config/env.js";
import apiResponse from "../utils/apiResponse.js";
import userNormalization from "../utils/userNormalization.js";

export const getCurrentUser = async (req, res) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }

        const decoded = jwt.verify(token, ENV.JWT_SECRET);
        const user = await User.findById(decoded.userId);
        if (!user) return apiResponse(res, "Unauthorized", 401)

        return apiResponse(res, "user validated", 200,{user});
    } catch (error) {
        console.error("Error at getCurrentUser", error)
        return apiResponse(res,"Error at getCurrentUser", 500)
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
        const token = jwt.sign({ userId: newUser[0]._id }, ENV.JWT_SECRET, { expiresIn: ENV.JWT_EXPIRE_IN });

        return apiResponse(res,"User created successfully", 201, {token, user:userNormalization(newUser[0])});
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

        const token = jwt.sign({ userId: existingUser._id }, ENV.JWT_SECRET, { expiresIn: ENV.JWT_EXPIRE_IN });
        return apiResponse(res,"User signin successfully", 200, {token, user:userNormalization(existingUser)});

    } catch (error) {
        console.error("Error at signup",error);
        return apiResponse(res, "Error at sign-in",500);
    }
}

export const signOut = async (req, res) => {
    res.send("log out ")
}