"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const configs_1 = __importDefault(require("../configs"));
const token_1 = require("../middleware/token");
class authController {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user_name = req.body.user_name;
                const email = req.body.email;
                const oldPassword = req.body.password;
                const password = yield bcrypt_1.default.hash(oldPassword, 10);
                const initValue = [user_name, email, password];
                const insertQuery = "INSERT INTO users(user_name, email, password) VALUES($1, $2, $3)";
                yield configs_1.default.query(insertQuery, initValue);
                res.status(201).json("Register done!");
            }
            catch (err) {
                console.error(err);
                res.status(500).json({ error: "Internal server error" });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user_name, password } = req.body;
            try {
                const { rows } = yield configs_1.default.query("SELECT *  FROM users WHERE user_name = $1", [user_name]);
                const user = rows[0];
                if (!user || !bcrypt_1.default.compareSync(password, user.password)) {
                    res.json({ message: "Invalid user_name or password" });
                }
                const token = (0, token_1.createToken)(user) || "";
                const RefreshToken = (0, token_1.refreshToken)(user, token);
                yield configs_1.default.query("UPDATE users SET refresh_token = $2 WHERE id = $1 ", [
                    user.id,
                    RefreshToken,
                ]);
                res.status(200).json({
                    user: user,
                    token,
                    refresh_token: RefreshToken,
                });
            }
            catch (err) {
                res.status(500).json({ message: "Internal server error" });
            }
        });
    }
    refreshToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { refresh_token, id } = req.body;
            try {
                const { rows } = yield configs_1.default.query("SELECT * FROM users WHERE id = $1", [
                    id,
                ]);
                if (!rows || rows.length === 0) {
                    res.status(404).json({ error: "User not found" });
                }
                const user = rows[0];
                if (user.refresh_token !== refresh_token) {
                    return res.status(400).json({ message: "Invalid refresh token" });
                }
                const RefreshToken = (0, token_1.refreshToken)(rows[0], refresh_token);
                yield configs_1.default.query("UPDATE users SET refresh_token = $2 WHERE id = $1 ", [
                    rows[0].id,
                    RefreshToken,
                ]);
                return res.status(201).json({ refresh_token: RefreshToken });
            }
            catch (error) {
                return res.sendStatus(500);
            }
        });
    }
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.body.id;
        });
    }
}
exports.default = new authController();
