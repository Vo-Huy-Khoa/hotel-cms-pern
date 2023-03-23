"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const migrations_1 = require("../database/migrations");
const router = (0, express_1.Router)();
router.get("/user", migrations_1.UserDown);
exports.default = router;
