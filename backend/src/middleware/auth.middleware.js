import apiResponse from '../utils/apiResponse.js';
import { getUserFromAccessToken } from '../utils/auth.js';

const authorize = async(req, res, next) => {
    try{
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }
        const user = await getUserFromAccessToken(token);
        if (!user) return apiResponse(res,"Unauthorized", 401);

        req.user = user;
        next();
    } catch (error){
        console.error("Error at authorization",error);
        return apiResponse(res,"Unauthorized",401);
    }
}

export default authorize;