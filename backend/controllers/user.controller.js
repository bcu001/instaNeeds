import User from "../models/user.model.js"

export const getUsers = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(401).json({
                message: "you don't have admin rights"
            })
        }
        const userData = await User.find().select('-password');
        if (userData.length === 0) {
            const error = new Error("no data found");
            error.statusCode = 404;
            throw error;
        }

        return res.status(200).json({
            success: true,
            data: {
                users: userData
            }
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const getUserById = async (req, res) => {
    try {
        if (req.params.id !== req.user._id.toString()) {
            return res.status(403).json({
                message: "access denied! you can check only your own info"
            })
        }
        // console.log("debug")
        const user = await User.findById(req.params.id).select("-password");
        if (!user) {
            const error = new Error("no data found");
            error.statusCode = 404;
            throw error;
        }
        return res.status(200).json({
            success: true,
            data: {
                user
            }
        })
    } catch (error) {
        return res.status(200).json({
            success: false,
            message: error.message
        })
    }
}