import express from 'express';
import * as PowerliftingController from '../controllers/powerlifting';

const router = express.Router();

// Add a new route for getting user ranking
router.get('/user-ranking', PowerliftingController.getUserRanking);


export default router;
