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
const configs_1 = __importDefault(require("../configs"));
class bookingController {
    // Retrieve all users from the database
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = "select bookings.id, bookings.client_id,bookings.room_id, rooms.name as room, clients.name as client, bookings.check_in, bookings.check_out,bookings.total_price, bookings.created_at, bookings.updated_at from bookings JOIN rooms on bookings.room_id=rooms.id JOIN clients on bookings.client_id= clients.id ORDER BY id DESC";
                const { rows } = yield configs_1.default.query(query);
                res.status(200).json(rows);
            }
            catch (error) {
                res.status(500).json({ error: "Internal server error" });
            }
        });
    }
    totalMoney(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = "SELECT SUM(total_price) FROM bookings;";
                const { rows } = yield configs_1.default.query(query);
                res.status(200).json(rows[0]);
            }
            catch (error) {
                res.status(500).json({ error: "Internal server error" });
            }
        });
    }
    countCheckIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = "SELECT COUNT(*) as count FROM bookings WHERE check_in = CURRENT_DATE";
                const { rows } = yield configs_1.default.query(query);
                res.status(200).json(rows[0]);
            }
            catch (error) {
                res.status(500).json({ error: "Internal server error" });
            }
        });
    }
    countCheckOut(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = "SELECT COUNT(*) as count FROM bookings WHERE check_out = CURRENT_DATE";
                const { rows } = yield configs_1.default.query(query);
                res.status(200).json(rows[0]);
            }
            catch (error) {
                res.status(500).json({ error: "Internal server error" });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { room_id, client_id, check_in, check_out, total_price } = req.body;
                const initValue = [room_id, client_id, check_in, check_out, total_price];
                const insertQuery = "INSERT INTO bookings(room_id, client_id, check_in, check_out, total_price) VALUES($1, $2, $3, $4, $5) RETURNING *";
                const { rows } = yield configs_1.default.query(insertQuery, initValue);
                res.status(201).json(rows[0]);
            }
            catch (err) {
                console.error(err);
                res.status(500).json({ error: "Internal server error" });
            }
        });
    }
    find(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { rows } = yield configs_1.default.query(`SELECT * FROM bookings WHERE id = ${id}`);
                res.status(202).json(rows[0]);
            }
            catch (error) {
                res.status(500).json({ error: "Internal server error" });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, room_id, client_id, check_in, check_out, total_price } = req.body;
                const query = {
                    text: "UPDATE bookings SET room_id = $2, client_id = $3, check_in = $4, check_out = $5, total_price = $6 WHERE id = $1",
                    values: [id, room_id, client_id, check_in, check_out, total_price],
                };
                const { rowCount } = yield configs_1.default.query(query);
                if (rowCount === 0) {
                    return res.status(404).json({ error: "bookings not found" });
                }
                res.status(202).json({ message: "bookings updated successfully" });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "Internal server error" });
            }
        });
    }
}
exports.default = new bookingController();
