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
exports.RoomDown = exports.RoomUp = void 0;
const configs_1 = __importDefault(require("../../configs"));
const migrationQuery = `
  CREATE TABLE IF NOT EXISTS rooms (
    id SERIAL PRIMARY KEY,
    room_type_id SERIAL NOT NULL,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    image VARCHAR(100),
    status boolean,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY(room_type_id) 
	  REFERENCES room_types(id)
  );
`;
function RoomUp(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield configs_1.default.query(migrationQuery);
            res.status(201).json("Migration rooms successful");
        }
        catch (error) {
            res.status(500).json({ error: "Migration rooms error" });
        }
    });
}
exports.RoomUp = RoomUp;
function RoomDown(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield configs_1.default.query("DROP TABLE rooms");
            res.status(201).json("DROP rooms successful");
        }
        catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    });
}
exports.RoomDown = RoomDown;
