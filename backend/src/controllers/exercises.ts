import { RequestHandler } from "express";
import SetsModel from "../models/sets";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import { assertIsDefined } from "../util/assertIsDefined";

export const getSets: RequestHandler = async (req, res, next) => {
    const authenticatedUserId = req.session.userId;
    
    try{
        assertIsDefined(authenticatedUserId);

        // throw Error("There was an error")
        const set = await SetsModel.find({userId: authenticatedUserId}).exec();
        res.status(200).json(set)
    } catch (error) {
        next(error)
    }
};

export const getSet: RequestHandler = async(req, res, next) =>{
    const setId = req.params.setId;
    const authenticatedUserId = req.session.userId;


    try {
        assertIsDefined(authenticatedUserId);


        if (!mongoose.isValidObjectId(setId)){
            throw createHttpError(400, "Invalid set id");
        }

        const set = await SetsModel.findById(setId).exec();

        if(!set) {
            throw createHttpError(404, "Set not found")
        }

        if (!set.userId.equals(authenticatedUserId)) {
            throw createHttpError(401, "You cannot access this set");
        }
        res.status(200).json(set);        
    } catch (error) {
        next(error);
    }
}

interface CreateSetBody {
    userId?: string,
    exerciseName?: string,
    weight?: number,
    repetitions?: number,
    rpe?: number,
    date?: Date
}

export const createSet: RequestHandler<unknown, unknown, CreateSetBody, unknown> = async (req, res, next) =>{
    // To change as autocomplete from db later for this one
    const exerciseName = req.body.exerciseName;
    const weight = req.body.weight;
    const repetitions = req.body.repetitions;
    const rpe = req.body.rpe;
    const date = req.body.date;
    const authenticatedUserId = req.session.userId;


    try {
        assertIsDefined(authenticatedUserId);

        const newSet = await SetsModel.create({
            userId: authenticatedUserId,
            exerciseName: exerciseName,
            weight: weight,
            repetitions: repetitions,
            rpe: rpe,
            date: date,
        });

        res.status(201).json(newSet);
    } catch (error) {
        next(error);
    }
}

interface UpdateSetParams {
    setId: string,
}

interface UpdateSetBody{
    exerciseName?: string,
    weight?: number,
    repetitions?: number,
    rpe?: number,
    date?: Date,
}

export const updateSet: RequestHandler<UpdateSetParams, unknown, UpdateSetBody, unknown> =async (req, res, next) => {
    const setId = req.params.setId;
    const newExerciseName = req.body.exerciseName;
    const newWeight = req.body.weight;
    const newRepetitions = req.body.repetitions;
    const newRpe = req.body.rpe;
    const newDate = req.body.date;
    const authenticatedUserId = req.session.userId;

    
    try {
        assertIsDefined(authenticatedUserId);

         if (!mongoose.isValidObjectId(setId)){
            throw createHttpError(400, "Invalid set id");
         }

         const set = await SetsModel.findById(setId).exec();

         if(!set) {
            throw createHttpError(404, "Set not found")
        }

        if (!set.userId.equals(authenticatedUserId)) {
            throw createHttpError(401, "You cannot access this set");
        }

        // Our front-end will ensure that those values are not null
        set.exerciseName = newExerciseName!;
        set.weight = newWeight!;
        set.repetitions = newRepetitions!;
        set.rpe = newRpe!;
        set.date = newDate!;

        const updatedSet = await set.save();

        res.status(200).json(updatedSet);
    } catch (error) {
        next(error);
    }    
};

export const deleteSet: RequestHandler = async(req, res, next) => {
    const setId = req.params.setId;
    const authenticatedUserId = req.session.userId;

    try {
        assertIsDefined(authenticatedUserId);

        if (!mongoose.isValidObjectId(setId)){
            throw createHttpError(400, "Invalid set id");
         }
         const set = await SetsModel.findById(setId).exec();

         if(!set) {
            throw createHttpError(404, "Set not found")
        }
        if (!set.userId.equals(authenticatedUserId)) {
            throw createHttpError(401, "You cannot access this set");
        }

        await set.deleteOne();

        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}