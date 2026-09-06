import {rateLimit} from "express-rate-limit"

const rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
	limit: 100, 
    message: {error:"too many requests, pleae try again later"}
})

export default rateLimiter