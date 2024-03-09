import { RequestHandler } from "express";
import SetsModel from "../models/sets";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import { assertIsDefined } from "../util/assertIsDefined";
// import * as XLSX from 'xlsx';

// Function to get the sets for the user
export const getSets: RequestHandler = async (req, res, next) => {
    // Checking bot req.user for passport middleware or req.user
    const authenticatedUserId = req.user ? req.user : req.session.userId;
    
    try{
        // Check if User is authenticated or not
        assertIsDefined(authenticatedUserId);
        const set = await SetsModel.find({userId: authenticatedUserId}).exec();
        res.status(200).json(set)
    } catch (error) {
        next(error)
    }
};

// Function to get one particular set with set ID
export const getSet: RequestHandler = async(req, res, next) =>{
    const setId = req.params.setId;
    const authenticatedUserId = req.user ? req.user : req.session.userId;

    try {
        // Check if User is authenticated
        assertIsDefined(authenticatedUserId);

        // Check if Set ID is in the database
        if (!mongoose.isValidObjectId(setId)){
            throw createHttpError(400, "Invalid set id");
        }

        const set = await SetsModel.findById(setId).exec();

        // Check if set can be found
        if(!set) {
            throw createHttpError(404, "Set not found")
        }

        // Check if set found belongs to the user logged on
        if (!set.userId.toString() === (authenticatedUserId)) {
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
// Function to create a set in the database
export const createSet: RequestHandler<unknown, unknown, CreateSetBody, unknown> = async (req, res, next) =>{
    const exerciseName = req.body.exerciseName;
    const weight = req.body.weight;
    const repetitions = req.body.repetitions;
    const rpe = req.body.rpe;
    const date = req.body.date;
    const authenticatedUserId = req.user ? req.user : req.session.userId;

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

// async function createSetDirectly(setData: CreateSetBody) {
//     const { userId, exerciseName, weight, repetitions, rpe, date } = setData;
  
//     const newSet = await SetsModel.create({
//       userId,
//       exerciseName,
//       weight,
//       repetitions,
//       rpe,
//       date,
//     });
  
//     return newSet;
//   }  


// export const createSetsFromExcel: RequestHandler = async (req, res, next) => {
//     if (!req.file) {
//         // If there's no file, send an error response or throw an Error
//         return res.status(400).json({ message: "No file uploaded." });
//         // or throw new Error('No file uploaded.');
//     }    
//     try {
//       const file = req.file;
//       const workbook = XLSX.readFile(file.path);
//       const sheetName = workbook.SheetNames[0];
//       const worksheet = workbook.Sheets[sheetName];
//       const data = XLSX.utils.sheet_to_json(worksheet);
//       const authenticatedUserId = req.user ? req.user : req.session.userId;
  
//       assertIsDefined(authenticatedUserId);
  
//       for (const row of data) {
//         // Assuming the column names in your Excel match the field names in CreateSetBody
//         const { exerciseName, weight, repetitions, rpe } = row;
  
//         // Directly create each set, assuming createSet is refactored to a reusable function without request and response
//         await createSetDirectly({
//           userId: authenticatedUserId,
//           exerciseName,
//           weight,
//           repetitions,
//           rpe,
//           date: new Date(), // Or however you want to handle dates
//         });
//       }
  
//       res.status(200).json({ message: "Sets updated successfully" });
//     } catch (error) {
//       next(error);
//     }
//   };

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
// Function to Update an existing set
export const updateSet: RequestHandler<UpdateSetParams, unknown, UpdateSetBody, unknown> =async (req, res, next) => {
    const setId = req.params.setId;
    const newExerciseName = req.body.exerciseName;
    const newWeight = req.body.weight;
    const newRepetitions = req.body.repetitions;
    const newRpe = req.body.rpe;
    const newDate = req.body.date;
    const authenticatedUserId = req.user ? req.user : req.session.userId;

    try {
        assertIsDefined(authenticatedUserId);

        // Check if the set ID is valid as per mongoDB's IDs
         if (!mongoose.isValidObjectId(setId)){
            throw createHttpError(400, "Invalid set id");
         }

         const set = await SetsModel.findById(setId).exec();

        //  Check if set exists
         if(!set) {
            throw createHttpError(404, "Set not found")
        }

        // Check if user is allowed to edit this set
        if (!set.userId.toString() === (authenticatedUserId)) {
            throw createHttpError(401, "You cannot access this set");
        }

        // Our front-end will ensure that those values are not null
        // TODO: Maybe create if scenarios if those are blank throw error ?
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

// Function to delete a set
export const deleteSet: RequestHandler = async(req, res, next) => {
    const setId = req.params.setId;
    const authenticatedUserId = req.user ? req.user : req.session.userId;

    try {
        assertIsDefined(authenticatedUserId);

        if (!mongoose.isValidObjectId(setId)){
            throw createHttpError(400, "Invalid set id");
         }
         const set = await SetsModel.findById(setId).exec();

         if(!set) {
            throw createHttpError(404, "Set not found")
        }
        if (!set.userId.toString() === (authenticatedUserId)) {
            throw createHttpError(401, "You cannot access this set");
        }

        await set.deleteOne();

        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}