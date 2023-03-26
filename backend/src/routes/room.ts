import { Router } from "express";
import roomController from "../controllers/roomController";

const router = Router();

router.post("/create", roomController.create);
router.put("/update", roomController.update);
router.get("/", roomController.getAll);

export default router;
