import express, { Router } from "express";
import userRouter from "./user";
import roomRouter from "./room";
import roomTypeRouter from "./room_type";
import clientRouter from "./client";
import bookingRouter from "./booking";
import migrationRouter from "./migration";
import seederRouter from "./seeder";
import dropRouter from "./drop";
import authRouter from "./auth";
import { authToken } from "../middleware/auth";

const router = Router();
const routes = (app: express.Application) => {
  router.use("/migration", migrationRouter);
  router.use("/drop", dropRouter);
  router.use("/seeder", seederRouter);
  router.use("/auth", authRouter);
  router.use("/user", authToken, userRouter);
  router.use("/room_type", authToken, roomTypeRouter);
  router.use("/room", authToken, roomRouter);
  router.use("/client", authToken, clientRouter);
  router.use("/booking", authToken, bookingRouter);

  return app.use("/api", router);
};

export default routes;
