import { RequestHandler } from "express";
import createHttpError from "http-errors";

// Check is the user is authenticated or not
export const requiresAuth: RequestHandler = (req, res, next) => {
    // Check for both authentication method (normal and Passport)
    if (req.isAuthenticated() || req.session.userId){
        next();
    } else {
        next(createHttpError(401, "User not authenticated"));
    }
};