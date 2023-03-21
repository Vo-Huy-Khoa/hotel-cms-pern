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
exports.UserDown = exports.UserUp = void 0;
const configs_1 = __importDefault(require("../../configs"));
const migrationQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    user_name VARCHAR(50) NOT NULL,
    full_name VARCHAR(60),
    email VARCHAR(100),
    password VARCHAR(255) NOT NULL,
    identity_number VARCHAR(15),
    phone VARCHAR(12),
    role SERIAL,
    refresh_token VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
  );
`;
function UserUp(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield configs_1.default.query(migrationQuery);
            res.status(201).json("Migration users successful");
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ error: "Migration users error" });
        }
    });
}
exports.UserUp = UserUp;
function UserDown(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield configs_1.default.query("DROP TABLE users");
            res.status(201).json("DROP users successful");
        }
        catch (error) {
            res.status(500).json({ error: "DROP table users error" });
        }
    });
}
exports.UserDown = UserDown;
