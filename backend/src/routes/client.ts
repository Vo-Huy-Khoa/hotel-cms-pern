import { Router } from "express";
import clientController from "../controllers/clientController";

const router = Router();

router.post("/create", clientController.create);
router.put("/update", clientController.update);
router.get("/", clientController.getAll);

export default router;
