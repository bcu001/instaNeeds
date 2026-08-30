import apiResponse from "../utils/apiResponse.js"


const authorizeAdmin = (req,res,next)=>{
    try{
        if (req.user.role !== 'admin') return apiResponse(res,"you don't have admin rights",401);
        next();
    } catch(error){
        console.error("Error at Admin authorization", error);
        return apiResponse(res,"Error at Admin authorization", 500);
    }
}

export default authorizeAdmin;