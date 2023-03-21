import { Router } from "express";
import authController from "../controllers/authController";

const router = Router();

router.get("/register", authController.register);
router.get("/login", authController.login);
router.get("/refreshToken", authController.refreshToken);

export default router;
