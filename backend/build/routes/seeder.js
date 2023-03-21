"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const seeders_1 = require("../database/seeders");
const router = (0, express_1.Router)();
router.get("/user", seeders_1.seederUser);
router.get("/hotel", seeders_1.seederHotel);
exports.default = router;
