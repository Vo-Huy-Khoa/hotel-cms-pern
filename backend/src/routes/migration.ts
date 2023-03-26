import { Router } from "express";
import {
  BookingUp,
  ClientUp,
  RoomTypeUp,
  RoomUp,
  UserUp,
} from "../database/migrations";

const router = Router();

router.get("/user", UserUp);
router.get("/client", ClientUp);
router.get("/room_type", RoomTypeUp);
router.get("/room", RoomUp);
router.get("/booking", BookingUp);

export default router;
