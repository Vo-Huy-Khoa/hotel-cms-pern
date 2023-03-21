import express, { Router } from "express";
import userRouter from "./user";
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
  router.use("/user", authToken, userRouter);
  router.use("/auth", authRouter);
  return app.use("/api", router);
};

export default routes;
