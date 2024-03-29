import express from 'express';
import * as PowerliftingController from '../controllers/powerlifting';

const router = express.Router();

router.get('/user-ranking', PowerliftingController.getUserRanking);


export default router;
