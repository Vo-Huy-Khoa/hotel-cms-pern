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
exports.RoomTypeDown = exports.RoomTypeUp = void 0;
const configs_1 = __importDefault(require("../../configs"));
const migrationQuery = `
  CREATE TABLE IF NOT EXISTS room_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    count decimal,
    price decimal,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
  );
`;
function RoomTypeUp(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield configs_1.default.query(migrationQuery);
            res.status(201).json("Migration room_types successful");
        }
        catch (error) {
            res.status(500).json({ error: "Migration room_types error" });
        }
    });
}
exports.RoomTypeUp = RoomTypeUp;
function RoomTypeDown(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield configs_1.default.query("DROP TABLE room_types");
            res.status(201).json("DROP room_types successful");
        }
        catch (error) {
            res.status(500).json({ error: "DROP room_types error" });
        }
    });
}
exports.RoomTypeDown = RoomTypeDown;
