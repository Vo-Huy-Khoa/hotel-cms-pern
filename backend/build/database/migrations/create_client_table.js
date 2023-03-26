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
exports.ClientDown = exports.ClientUp = void 0;
const configs_1 = __importDefault(require("../../configs"));
const migrationQuery = `
  CREATE TABLE IF NOT EXISTS clients (
    id SERIAL PRIMARY KEY,
    name VARCHAR(60),
    email VARCHAR(100),
    identity_number VARCHAR(15),
    phone VARCHAR(12),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
  );
`;
function ClientUp(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield configs_1.default.query(migrationQuery);
            res.status(201).json("Migration clients successful");
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ error: "Migration clients error" });
        }
    });
}
exports.ClientUp = ClientUp;
function ClientDown(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield configs_1.default.query("DROP TABLE clients");
            res.status(201).json("DROP clients successful");
        }
        catch (error) {
            res.status(500).json({ error: "DROP table clients error" });
        }
    });
}
exports.ClientDown = ClientDown;
