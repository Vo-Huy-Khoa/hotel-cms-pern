"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = __importDefault(require("../controllers/userController"));
const router = (0, express_1.Router)();
router.post('/create', userController_1.default.create);
router.post('/search', userController_1.default.search);
router.get('/edit/:id', userController_1.default.find);
router.put('/update', userController_1.default.update);
router.delete('/delete/:id', userController_1.default.delete);
router.get('/count', userController_1.default.count);
router.get('/', userController_1.default.getAll);
exports.default = router;
