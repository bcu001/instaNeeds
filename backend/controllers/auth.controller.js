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
    try {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            const error = new Error("No match found for data");
            error.statusCode = 404;
            throw error;
        }

        const validPassword = await bcrypt.compare(password, existingUser.password);

        if (!validPassword) {
            const error = new Error("password is wrong");
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign({ userId: existingUser._id }, JWT_SECRET, { expiresIn: JWT_EXPIRE_IN });

        res.status(200).json({
            success: true,
            data: {
                token,
                user: existingUser
            }
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error?.message,
        })
    }
}

export const signOut = async (req, res) => {
    res.send("log out ")
}