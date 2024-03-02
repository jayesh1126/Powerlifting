import express from 'express';
import * as PowerliftingController from '../controllers/powerlifting';

const router = express.Router();

// Add a new route for getting user ranking
router.get('/user-ranking', PowerliftingController.getUserRanking);

router.get('/onerepmax', PowerliftingController.getOneRepMax);

router.post('/averageonerepmax', PowerliftingController.getAverageOneRepMax);

export default router;
