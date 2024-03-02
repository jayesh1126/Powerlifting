import { RequestHandler } from 'express';
import { calculateRanking } from '../util/rankingCalculator';
import { calculateOneRepMax, SetData, calculateAverageOneRepMax } from '../util/oneRepMaxCalculator';

export const getUserRanking: RequestHandler = async (req, res, next) => {
    try {
        // Extract user data from query parameters or the request body and ensure types are correct
        const total = parseFloat(req.query.total as string);
        const age = parseInt(req.query.age as string);
        const weightClass = parseFloat(req.query.weightClass as string);
        const sex = req.query.sex as 'M' | 'F';

        // Check if any of the values are NaN (not a number) or undefined after conversion
        if (isNaN(total) || isNaN(age) || isNaN(weightClass) || (sex !== 'M' && sex !== 'F')) {
            return res.status(400).json({ error: 'Invalid input data' });
        }

        const ranking = await calculateRanking(total, age, weightClass, sex);
        res.status(200).json({ ranking });
    } catch (error) {
        next(error);
    }
};

export const getOneRepMax: RequestHandler = async (req, res, next) => {
    try {
        // Extract user data from query parameters and ensure types are correct
        const weight = req.query.weight as string;
        const repetitions = req.query.repetitions as string;
        const rpe = req.query.rpe as string;

        // Convert and validate the extracted values
        const weightNum = parseFloat(weight);
        const repetitionsNum = parseInt(repetitions, 10);
        const rpeNum = parseFloat(rpe);

        // Check if any of the values are NaN (not a number) or undefined after conversion
        if (isNaN(weightNum) || isNaN(repetitionsNum) || isNaN(rpeNum)) {
            return res.status(400).json({ error: 'Invalid input data' });
        }

        // Create a SetData object to pass to the calculateOneRepMax function
        const setData: SetData = {
            weight,
            repetitions,
            rpe
        };

        // Await the calculation result
        const oneRepMax = await calculateOneRepMax(setData);
        
        // Send the result in the response
        res.status(200).json({ oneRepMax });
    } catch (error) {
        next(error);
    }
};

export const getAverageOneRepMax: RequestHandler = async (req, res, next) => {
    try {
        // console.log(req.body); // Log the incoming request body to inspect the format.
        const userSets: SetData[] = req.body;
        const averageResult = await calculateAverageOneRepMax(userSets);

        // Check if the result is a number and send the response
        if (typeof averageResult === 'number') {
            res.status(200).json({ averageOneRepMax: averageResult });
        } else {
            // If the result is an error message, handle accordingly
            res.status(400).json({ error: averageResult });
        }
    } catch (error) {
        next(error);
    }
}
