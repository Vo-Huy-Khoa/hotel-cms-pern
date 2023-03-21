"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = __importDefault(require("./user"));
const migration_1 = __importDefault(require("./migration"));
const seeder_1 = __importDefault(require("./seeder"));
const drop_1 = __importDefault(require("./drop"));
const auth_1 = __importDefault(require("./auth"));
const auth_2 = require("../middleware/auth");
const router = (0, express_1.Router)();
const routes = (app) => {
    router.use("/migration", migration_1.default);
    router.use("/drop", drop_1.default);
    router.use("/seeder", seeder_1.default);
    router.use("/user", auth_2.authToken, user_1.default);
    router.use("/auth", auth_1.default);
    return app.use("/api", router);
};
exports.default = routes;
