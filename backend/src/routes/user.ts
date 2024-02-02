import express from "express";
import * as UsersController from "../controllers/user";

const router = express.Router();

router.get("/", UsersController.getAuthenticatedUser);

router.post("/signup", UsersController.signUp);

router.post("/login", UsersController.login);

router.post("/logout", UsersController.logout);

export default router;