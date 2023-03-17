"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = __importDefault(require("./app/controllers/userController"));
const migrations_1 = require("./database/migrations");
const seeders_1 = require("./database/seeders");
const router = (0, express_1.Router)();
const routes = (app) => {
    router.get("/migration/user", migrations_1.UserUp);
    router.get("/drop/user", migrations_1.UserDown);
    router.get("/seeder/user", seeders_1.seederUser);
    router.get("/users", userController_1.default.getAll);
    router.post("/users/create", userController_1.default.create);
    return app.use("/api", router);
};
exports.default = routes;
