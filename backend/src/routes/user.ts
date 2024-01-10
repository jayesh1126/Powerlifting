import express from "express";
import * as UsersController from "../controllers/user";

const router = express.Router();

router.get("/", UsersController.getUsers);

router.post("/", UsersController.createUser);

export default router;