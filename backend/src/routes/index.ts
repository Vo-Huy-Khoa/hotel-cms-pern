import express, { Router } from "express";
import userRouter from "./user";
import migrationRouter from "./user";
import seederRouter from "./user";
import dropRouter from "./user";
const router = Router();
const routes = (app: express.Application) => {
  router.use("/migration", migrationRouter);
  router.use("/drop", dropRouter);
  router.use("/seeder", seederRouter);
  router.use("/user", userRouter);
  router.use("/auth", userRouter);
  return app.use("/api", router);
};

export default routes;
