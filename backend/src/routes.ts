import express from "express";
import Router from "express";
import userController from "./controllers/userController";
const router = Router();
const routes = (app: express.Application) => {
  router.get("/users", userController.getUsers);
  router.post("/users/create", userController.createUser);

  return app.use("/api", router);
};

export default routes;
