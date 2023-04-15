"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clientController_1 = __importDefault(require("../controllers/clientController"));
const router = (0, express_1.Router)();
router.post('/create', clientController_1.default.create);
router.get('/edit/:id', clientController_1.default.find);
router.put('/update', clientController_1.default.update);
router.delete('/delete/:id', clientController_1.default.delete);
router.get('/count', clientController_1.default.count);
router.get('/', clientController_1.default.getAll);
exports.default = router;
