import { RequestHandler } from "express";
import UserModel from "../models/user";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import { assertIsDefined } from "../util/assertIsDefined";
import mongoose from "mongoose";

export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
    try {

        const user = await UserModel.findById(req.session.userId).select("+email").exec();
        res.status(200).json(user);

    } catch (error) {
        next(error);
    }
}

interface SignUpBody {
    username?: string,
    email?: string,
    password?: string,

}
export const signUp: RequestHandler<unknown, unknown, SignUpBody, unknown> = async (req, res, next) => {
    const username = req.body.username;
    const email = req.body.email;
    const passwordRaw = req.body.password;

    try {
        if (!username || !email || !passwordRaw){
            throw createHttpError(400, "Parameters missing");
        }

        const existingUsername = await UserModel.findOne({ username: username}).exec();
        if (existingUsername) {
            throw createHttpError(409, "The username is already taken, please choose a different one.");
        }

        const existingEmail = await UserModel.findOne({ email: email}).exec();
        if (existingEmail) {
            throw createHttpError(409, "The email is already in use, please choose a different one.");
        }

        const passwordHashed = await bcrypt.hash(passwordRaw, 10);

        const newUser = await UserModel.create({
            username: username,
            email: email,
            password: passwordHashed,
        });

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
    const authenticatedUserId = req.session.userId;

    try {
        assertIsDefined(authenticatedUserId);
        
        if (!mongoose.isValidObjectId(userId)){
            throw createHttpError(400, "Invalid user id");
         }

         const user = await UserModel.findById(userId).exec();

         if(!user) {
            throw createHttpError(404, "User not found")
        }
        
        if (!user._id.equals(authenticatedUserId)) {
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

export const login: RequestHandler<unknown, unknown, LoginBody, unknown> = async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const rememberMe = req.body.rememberMe;
    
    try {
        if (!username || !password) {
            throw createHttpError(400, "Parameters missing");
        }

        const user = await UserModel.findOne({username: username}).select("+password +email").exec();

        if (!user){
            throw createHttpError(401, "Invalid credentials");
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            throw createHttpError(401, "Invalid credentials");
        }

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

export const logout: RequestHandler = (req, res, next) => {
    req.session.destroy(error => {
        if (error) {
            next(error);
        } else {
            res.sendStatus(200);
        }
    })
};