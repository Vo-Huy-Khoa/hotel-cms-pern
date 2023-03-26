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
exports.BookingDown = exports.BookingUp = void 0;
const configs_1 = __importDefault(require("../../configs"));
const migrationQuery = `
  CREATE TABLE IF NOT EXISTS bookings (
    id SERIAL PRIMARY KEY,
    room_id SERIAL NOT NULL,
    user_id SERIAL NOT NULL,
    check_in date NOT NULL,
    check_out date,
    total_price float,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY(room_id) 
	  REFERENCES rooms(id),
    FOREIGN KEY(user_id) 
	  REFERENCES users(id)
  );
`;
function BookingUp(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield configs_1.default.query(migrationQuery);
            res.status(201).json("Migration bookings successful");
        }
        catch (error) {
            res.status(500).json({ error: "Migration bookings error" });
        }
    });
}
exports.BookingUp = BookingUp;
function BookingDown(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield configs_1.default.query("DROP TABLE bookings");
            res.status(201).json("DROP bookings successful");
        }
        catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    });
}
exports.BookingDown = BookingDown;
