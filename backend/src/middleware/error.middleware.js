import apiResponse from "../utils/apiResponse.js";

export const notFound = (req, res) => {
    return apiResponse(res, `Route not found: ${req.method} ${req.originalUrl}`, 404);
};

export const errorHandler = (error, req, res, next) => {
    console.error("Unhandled API error", error);

    if (res.headersSent) return next(error);

    if (error.type === "entity.parse.failed") {
        return apiResponse(res, "Invalid JSON request body", 400);
    }

    const statusCode = Number.isInteger(error.statusCode)
        ? error.statusCode
        : Number.isInteger(error.status)
            ? error.status
            : 500;
    const message = statusCode >= 500 ? "Internal server error" : error.message;

    return apiResponse(res, message || "Request failed", statusCode);
};