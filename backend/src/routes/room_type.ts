import { Router } from "express";
import roomTypeController from "../controllers/roomTypeController";

const router = Router();

router.post("/create", roomTypeController.create);
router.get("/edit/:id", roomTypeController.find);
router.put("/update", roomTypeController.update);
router.get("/", roomTypeController.getAll);

export default router;
