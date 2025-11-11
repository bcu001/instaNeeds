import User from "../models/user.model.js"

export const getUsers = async (req, res) => {
    try {
        const userData = await User.find().select('-password');
        if (userData.length === 0) {
            const error = new Error("no data found");
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            success: true,
            data: {
                users: userData
            }
        })
    } catch (error) {
        res.status(200).json({
            success: false,
            message: error.message
        })
    }
}

export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
        if (!user) {
            const error = new Error("no data found");
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            success: true,
            data: {
                user
            }
        })
    } catch (error) {
        res.status(200).json({
            success: false,
            message: error.message
        })
    }
}