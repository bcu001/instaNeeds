import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRE_IN } from "../config/config.js";

export const signUp = async (req, res) => {
    
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { name, email, password, role } = req.body;

        const existingUser = await User.findOne({ email }); 

        if (existingUser) {
            const error = new Error("User already exists");
            error.statusCode = 409;
            throw error;
        }

        const salt = await bcrypt.genSalt(10);
        const hassPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create([{ name, email, password: hassPassword, role }], { session });


        const token = jwt.sign({ userId: newUser[0]._id }, JWT_SECRET, { expiresIn: JWT_EXPIRE_IN });

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: {
                token,
                user: newUser[0]
            }
        });

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        res.status(500).json({
            success: false,
            message: error?.message,
        })
    }
}

export const signIn = async (req, res) => {
    res.send("log in ")
    // first get email and password
    try{
        const {email, password} = req.body;
        // check existing User

        
        // if not there throw error
        // if there is compare passward with hassword
        // if not valid throw erro
        // if valid generate token
        // send success , token ,data :user
    } catch(error){
        res.status(500).json({
            success: false,
            message: error?.message,
        })
    }
}

export const signOut = async (req, res, next) => {
    res.send("log out ")
}