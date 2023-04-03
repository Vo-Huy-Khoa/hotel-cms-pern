import { Router } from "express";
import userController from "../controllers/userController";
const router = Router();

router.post("/create", userController.create);
router.get("/edit/:id", userController.find);
router.put("/update", userController.update);
router.delete("/delete/:id", userController.delete);
router.get("/count", userController.count);
router.get("/", userController.getAll);

export default router;
