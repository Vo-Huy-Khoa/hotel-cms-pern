"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const roomController_1 = __importDefault(require("../controllers/roomController"));
const router = (0, express_1.Router)();
router.post("/create", roomController_1.default.create);
router.put("/update", roomController_1.default.update);
router.get("/", roomController_1.default.getAll);
exports.default = router;