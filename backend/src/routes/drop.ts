import { Router } from "express";
import { HotelDown, UserDown } from "../database/migrations";

const router = Router();

router.get("/user", UserDown);
router.get("/hotel", HotelDown);

export default router;
