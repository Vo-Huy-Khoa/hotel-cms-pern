import express, { Router } from "express";
import userController from "./app/controllers/userController";
import { UserUp, UserDown } from "./database/migrations";
import { seederUser } from "./database/seeders";
const router = Router();
const routes = (app: express.Application) => {
  router.get("/migration/user", UserUp);
  router.get("/drop/user", UserDown);
  router.get("/seeder/user", seederUser);
  router.get("/users", userController.getAll);
  router.post("/users/create", userController.create);
  return app.use("/api", router);
};

export default routes;
