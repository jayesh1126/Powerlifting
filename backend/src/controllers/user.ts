import { RequestHandler } from "express";
import UserModel from "../models/user";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import { assertIsDefined } from "../util/assertIsDefined";
import mongoose from "mongoose";

// Function to get user that is authenticated
export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
    try {
        const user = req.user ? req.user : await UserModel.findById(req.session.userId).select("+email").exec();
        // console.log(req.session);
        res.status(200).json(user);

    } catch (error) {
        // console.log(req.session);
        next(error);
    }
}

interface SignUpBody {
    username?: string,
    email?: string,
    password?: string,

}
// Function to handle the normal signing up of users
export const signUp: RequestHandler<unknown, unknown, SignUpBody, unknown> = async (req, res, next) => {
    const username = req.body.username;
    const email = req.body.email;
    const passwordRaw = req.body.password;

    try {
        // Check if parameters are missing
        if (!username || !email || !passwordRaw){
            throw createHttpError(400, "Parameters missing");
        }

        // Check if username is already taken
        const existingUsername = await UserModel.findOne({ username: username}).exec();
        if (existingUsername) {
            throw createHttpError(409, "The username is already taken, please choose a different one.");
        }

        // Check if email is already taken
        const existingEmail = await UserModel.findOne({ email: email}).exec();
        if (existingEmail) {
            throw createHttpError(409, "The email is already in use, please choose a different one.");
        }

        // Hashing of password using bcrypt
        const passwordHashed = await bcrypt.hash(passwordRaw, 10);

        // Creating new user
        const newUser = await UserModel.create({
            username: username,
            email: email,
            password: passwordHashed,
        });

        // Updating the session ID so the user is logged on right after signing up
        req.session.userId = newUser._id;

        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
}

interface UpdateUserParams {
    userId: string,
}

interface UpdateUserBody{
    fullName?: string,
    age?: number,
    weight?: number,
    sex?: string,
    bestSquat?: number,
    bestBenchPress?: number,
    bestDeadlift?: number,
    bestTotal?: number,
    squatGoal?: number,
    benchPressGoal?: number,
    deadliftGoal?: number,
    totalGoal?: number,
}

// Function to update the user as I designed the user to have their best lifts and goals in the user object
export const UpdateUser: RequestHandler<UpdateUserParams, unknown, UpdateUserBody, unknown> = async(req, res, next) => {
    const userId = req.params.userId;
    const fullName = req.body.fullName;
    const age = req.body.age;
    const weight = req.body.weight;
    const sex = req.body.sex;
    const bestSquat = req.body.bestSquat;
    const bestBenchPress = req.body.bestBenchPress;
    const bestDeadlift = req.body.bestDeadlift;
    const bestTotal = req.body.bestTotal;
    const squatGoal = req.body.squatGoal;
    const benchPressGoal = req.body.benchPressGoal;
    const deadliftGoal = req.body.deadliftGoal;
    const totalGoal = req.body.totalGoal;
    const authenticatedUserId = req.user ? req.user : req.session.userId;

    try {
        // Check if user is authenticated
        assertIsDefined(authenticatedUserId);
        
        if (!mongoose.isValidObjectId(userId)){
            throw createHttpError(400, "Invalid user id");
         }

         const user = await UserModel.findById(userId).exec();

         if(!user) {
            throw createHttpError(404, "User not found")
        }
        
        if (!user._id.toString() === (authenticatedUserId)) {
            throw createHttpError(401, "You cannot access this user");
        }

        user.fullName = fullName!;
        user.age = age!;
        user.weight = weight!;
        user.sex = sex!;
        user.bestSquat = bestSquat!;
        user.bestBenchPress = bestBenchPress!;
        user.bestDeadlift = bestDeadlift!;
        user.bestTotal = bestTotal!;
        user.squatGoal = squatGoal!;
        user.benchPressGoal = benchPressGoal!;
        user.deadliftGoal = deadliftGoal!;
        user.totalGoal = totalGoal!;

        const updatedUser = await user.save();

        res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }

}

interface LoginBody {
    username?: string,
    password?: string,
    rememberMe?: boolean,

}

// Function to handle the login of a user
export const login: RequestHandler<unknown, unknown, LoginBody, unknown> = async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const rememberMe = req.body.rememberMe;
    
    try {
        // Check if the parameters are missing
        if (!username || !password) {
            throw createHttpError(400, "Parameters missing");
        }

        const user = await UserModel.findOne({username: username}).select("+password +email").exec();

        // If no users is returned, credentials are wrong but we are not telling the user which one
        if (!user){
            throw createHttpError(401, "Invalid credentials");
        }

        const passwordMatch = await bcrypt.compare(password, user.password!);

        // If no password match is returned, credentials are wrong but we are not telling the user which one
        if (!passwordMatch) {
            throw createHttpError(401, "Invalid credentials");
        }

        // To change the expiration time of the session based on whether user slected the remember Me option
        if (rememberMe) {
            // Extend MaxAge for cookie to 7 days
            req.session.cookie.maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
        } else{
            req.session.cookie.maxAge = 60 * 60 * 1000; // 1 hour in milliseconds
        }

        req.session.userId = user._id;
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
}

// Function to handle the logout of user
export const logout: RequestHandler = (req, res, next) => {
    req.session.destroy(error => {
        if (error) {
            next(error);
        } else {
            res.sendStatus(200);
        }
    })
};