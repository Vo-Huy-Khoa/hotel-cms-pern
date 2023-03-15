import express from "express";
import Router from "express";
import userController from "./app/controllers/userController";
const router = Router();
const routes = (app: express.Application) => {
  router.get("/users", userController.getAll);
  router.post("/users/create", userController.create);

  return app.use("/api", router);
};

export default routes;
