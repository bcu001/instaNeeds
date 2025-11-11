import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/config.js'
import User from '../models/user.model.js';

// acquire token from header
// decode and valid
// if false return 401
// else add user to req and next

const authorize = async(req, res, next) => {
    try{
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {

            token = req.headers.authorization.split(" ")[1];
        }

        const decoded = jwt.verify(token, JWT_SECRET);

        const user = await User.findById(decoded.userId);

        if (!user) return res.status(401).json({ message: "Unauthorized" });

        req.user = user;
    
        // console.log(user)
        next();
    } catch (error){
        return res.status(401).json({
            message:"Unauthorized", 
            error: error.message
        })
    }
}

export default authorize;