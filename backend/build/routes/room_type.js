"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const roomTypeController_1 = __importDefault(require("../controllers/roomTypeController"));
const router = (0, express_1.Router)();
router.post('/create', roomTypeController_1.default.create);
router.get('/edit/:id', roomTypeController_1.default.find);
router.put('/update', roomTypeController_1.default.update);
router.post('/search', roomTypeController_1.default.search);
router.post('/find', roomTypeController_1.default.update);
router.delete('/delete/:id', roomTypeController_1.default.delete);
router.get('/count', roomTypeController_1.default.count);
router.get('/', roomTypeController_1.default.getAll);
exports.default = router;
