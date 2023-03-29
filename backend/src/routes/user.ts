import { Router } from "express";
import userController from "../controllers/userController";
const router = Router();

router.post("/create", userController.create);
router.get("/edit/:id", userController.find);
router.put("/update", userController.update);
router.get("/", userController.getAll);

export default router;
