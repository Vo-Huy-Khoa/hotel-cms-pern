import { Router } from "express";
import {
  seederBooking,
  seederClient,
  seederHotel,
  seederRoom,
  seederRoomType,
  seederUser,
} from "../database/seeders";

const router = Router();

router.get("/user", seederUser);
router.get("/hotel", seederHotel);
router.get("/client", seederClient);
router.get("/room_type", seederRoomType);
router.get("/room", seederRoom);
router.get("/booking", seederBooking);

export default router;
