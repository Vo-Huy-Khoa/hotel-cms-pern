"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = __importDefault(require("./user"));
const room_1 = __importDefault(require("./room"));
const room_type_1 = __importDefault(require("./room_type"));
const client_1 = __importDefault(require("./client"));
const booking_1 = __importDefault(require("./booking"));
const auth_1 = __importDefault(require("./auth"));
const auth_2 = require("../middleware/auth");
const router = (0, express_1.Router)();
const routes = (app) => {
    router.use('/auth', auth_1.default);
    router.use('/user', auth_2.authToken, user_1.default);
    router.use('/room_type', auth_2.authToken, room_type_1.default);
    router.use('/room', auth_2.authToken, room_1.default);
    router.use('/client', auth_2.authToken, client_1.default);
    router.use('/booking', auth_2.authToken, booking_1.default);
    return app.use('/api', router);
};
exports.default = routes;
