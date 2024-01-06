import express from "express";
import * as SetsController from "../controllers/exercises";

const router = express.Router();

router.get("/", SetsController.getSets);

router.post("/", SetsController.createSet);

export default router;