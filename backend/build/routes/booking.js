"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bookingController_1 = __importDefault(require("../controllers/bookingController"));
const router = (0, express_1.Router)();
router.post('/create', bookingController_1.default.create);
router.get('/edit/:id', bookingController_1.default.find);
router.put('/update', bookingController_1.default.update);
router.post('/search', bookingController_1.default.search);
router.delete('/delete/:id', bookingController_1.default.delete);
router.get('/count', bookingController_1.default.totalMoney);
router.get('/check_in', bookingController_1.default.countCheckIn);
router.get('/check_out', bookingController_1.default.countCheckOut);
router.get('/', bookingController_1.default.getAll);
exports.default = router;
