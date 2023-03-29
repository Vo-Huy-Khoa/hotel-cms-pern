import { Router } from "express";
import bookingController from "../controllers/bookingController";
const router = Router();

router.post("/create", bookingController.create);
router.get("/edit/:id", bookingController.find);
router.put("/update", bookingController.update);
router.get("/", bookingController.getAll);

export default router;
