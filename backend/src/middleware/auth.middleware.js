import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import ENV from '../config/env.js';
import apiResponse from '../utils/apiResponse.js';

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
        const decoded = jwt.verify(token, ENV.JWT_SECRET);
        const user = await User.findById(decoded.userId);
        if (!user) return apiResponse(res,"Unauthorized", 401);

        req.user = user;
        // console.log(user)
        next();
    } catch (error){
        console.error("Error at authorization",error);
        return apiResponse(res,"Unauthorized",401);
    }
}

export default authorize;