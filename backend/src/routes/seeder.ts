import { Router } from "express";
import { seederHotel, seederUser } from "../database/seeders";

const router = Router();

router.get("/user", seederUser);
router.get("/hotel", seederHotel);

export default router;
