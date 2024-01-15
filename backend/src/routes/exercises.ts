import express from "express";
import * as SetsController from "../controllers/exercises";

const router = express.Router();

router.get("/", SetsController.getSets);

router.get("/:setId", SetsController.getSet);

router.post("/", SetsController.createSet);

router.patch("/:setId", SetsController.updateSet);

router.delete("/:setId", SetsController.deleteSet);

export default router;