import User from "../models/user.model.js"
import apiResponse from "../utils/apiResponse.js";
import userNormalization from "../utils/userNormalization.js";

export const getUsers = async (req, res) => {
    try {
        if (req.user.role !== 'admin') return apiResponse(res,"you don't have admin rights",403); 
        const userData = await User.find().select("-__v -updatedAt");
        if (userData.length === 0) return apiResponse(res, "no users in db",404);
        return apiResponse(res, "users found",200, userData);
    } catch (error) {
        console.error("Error at getUsers",error);
        return apiResponse(res,"Error at getUsers",500);
    }
}

export const getUserById = async (req, res) => {
    try {
        if (req.params.id !== req.user._id.toString()) return apiResponse(res, "access denied!", 403) 
        const user = await User.findById(req.params.id).select("-password");
        if (!user) return apiResponse(res, "no user found", 404);
        return apiResponse(res, "user found", 200, userNormalization(user));
    } catch (error) {
        console.error("Error at getUserById", error);
        return apiResponse(res,"Error at getUserById",500);
    }
}