import { Router } from "express";
import { HotelUp, UserUp } from "../database/migrations";

const router = Router();

router.get("/user", UserUp);
router.get("/hotel", HotelUp);

export default router;
