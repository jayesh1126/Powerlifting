import { RequestHandler } from "express";
import SetsModel from "../models/sets";

export const getSets: RequestHandler = async (req, res, next) => {
    try{
        // throw Error("There was an error")
        const set = await SetsModel.find().exec();
        res.status(200).json(set)
    } catch (error) {
        next(error)
    }
};

export const createSet: RequestHandler = async (req, res, next) =>{
    // To change as autocomplete from db later for this one
    const userId = req.body.userId;
    const exerciseName = req.body.exerciseName;
    const weight = req.body.weight;
    const repetitions = req.body.repetitions;
    const rpe = req.body.rpe;

    try {
        const newSet = await SetsModel.create({
            userId: userId,
            exerciseName: exerciseName,
            weight: weight,
            repetitions: repetitions,
            rpe: rpe,
        });

        res.status(201).json(newSet);
    } catch (error) {
        next(error);
    }
}