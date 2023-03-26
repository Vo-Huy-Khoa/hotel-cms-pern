import { Router } from "express";
import {
  BookingDown,
  ClientDown,
  RoomDown,
  RoomTypeDown,
  UserDown,
} from "../database/migrations";

const router = Router();

router.get("/user", UserDown);
router.get("/client", ClientDown);
router.get("/room_type", RoomTypeDown);
router.get("/room", RoomDown);
router.get("/booking", BookingDown);

export default router;
