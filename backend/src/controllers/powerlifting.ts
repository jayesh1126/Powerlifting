import { RequestHandler } from 'express';
import { calculateRanking } from '../util/rankingCalculator';

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
