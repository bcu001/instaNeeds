
const apiResponse = async(
    res,
    message,
    statusCode,
    data=null,
)=>{
    return res.status(statusCode).json({
        success: statusCode >= 200 && statusCode <=299,
        message,
        data
    })
}

export default apiResponse;