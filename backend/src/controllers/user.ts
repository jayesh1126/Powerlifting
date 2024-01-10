import { RequestHandler } from "express";
import UserModel from "../models/user";

export const getUsers: RequestHandler = async (req, res, next) => {
    try{
        // throw Error("There was an error")
        const set = await UserModel.find().exec();
        res.status(200).json(set)
    } catch (error) {
        next(error)
    }
};

export const createUser: RequestHandler = async (req, res, next) =>{
    // To change as autocomplete from db later for this one
    const fullName = req.body.fullName;
    const username = req.body.username; // This could be undefined if not provided
    const email = req.body.email;
    const passwordHash = req.body.passwordHash; // Ensure this is hashed
    const age = req.body.age;
    const weight = req.body.weight;
    const bestSquat = req.body.bestSquat;
    const bestBenchPress = req.body.bestBenchPress;
    const bestDeadlift = req.body.bestDeadlift;
    const bestTotal = req.body.bestTotal;
    const squatGoal = req.body.squatGoal;
    const benchPressGoal = req.body.benchPressGoal;
    const deadliftGoal = req.body.deadliftGoal;
    const totalGoal = req.body.totalGoal;
    const googleId = req.body.googleId; // Optional Google OAuth ID
    const accessToken = req.body.accessToken; // Optional OAuth Access Token
    const refreshToken = req.body.refreshToken; // Optional OAuth Refresh Token


    try {
        const newSet = await UserModel.create({
            fullName,
            username, // Username is optional, so it's okay if it's undefined
            email,
            passwordHash, // Make sure to hash the password before saving
            age,
            weight,
            bestSquat,
            bestBenchPress,
            bestDeadlift,
            bestTotal,
            squatGoal,
            benchPressGoal,
            deadliftGoal,
            totalGoal,
            googleId, // If undefined, Mongoose won't include it
            accessToken, // If undefined, Mongoose won't include it
            refreshToken // If undefined, Mongoose won't include it
        });

        res.status(201).json(newSet);
    } catch (error) {
        next(error);
    }
}