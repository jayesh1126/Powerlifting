import express from "express";
import * as UsersController from "../controllers/user";
import { requiresAuth } from "../middleware/auth";

const router = express.Router();

router.get("/", requiresAuth, UsersController.getAuthenticatedUser);

router.post("/signup", UsersController.signUp);

router.post("/login", UsersController.login);

router.patch("/:userId", UsersController.UpdateUser);

router.post("/logout", UsersController.logout);

export default router;