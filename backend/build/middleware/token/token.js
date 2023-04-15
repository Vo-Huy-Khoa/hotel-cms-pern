"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshToken = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createToken = (user) => {
    const JWT_SECRET = process.env.JWT_SECRET || '';
    const payload = { id: user.id, user_name: user.user_name, email: user.email };
    let token = null;
    try {
        token = jsonwebtoken_1.default.sign(payload, JWT_SECRET, { expiresIn: '120s' });
    }
    catch (error) {
        console.error(error);
    }
    return token;
};
exports.createToken = createToken;
const refreshToken = (user, token) => {
    const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || '';
    const payload = { id: user.id, user_name: user.user_name, email: user.email };
    try {
        token = jsonwebtoken_1.default.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: '3600s' });
    }
    catch (error) {
        console.log(error);
    }
    return token;
};
exports.refreshToken = refreshToken;
