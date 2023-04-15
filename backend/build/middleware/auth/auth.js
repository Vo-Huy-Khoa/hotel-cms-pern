"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authToken = (req, res, next) => {
    const authorizationHeader = req.headers['authorization'];
    const token = (authorizationHeader === null || authorizationHeader === void 0 ? void 0 : authorizationHeader.split(' ')[1]) || '';
    if (!token) {
        res.status(401).json({ message: 'Token is not provided' });
    }
    try {
        const key = process.env.JWT_SECRET || '';
        const isVeriToken = jsonwebtoken_1.default.verify(token, key);
        if (isVeriToken) {
            next();
        }
    }
    catch (error) {
        res.status(403).json(error);
    }
};
exports.authToken = authToken;
