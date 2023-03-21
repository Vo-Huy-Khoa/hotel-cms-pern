import { Router } from "express";
import userController from "../controllers/userController";
const router = Router();

router.post("/create", userController.create);
router.put("/update", userController.update);
router.get("/", userController.getAll);

export default router;
