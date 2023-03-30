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
class roomController {
    // Retrieve all users from the database
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = "SELECT * FROM rooms ORDER BY id DESC";
                const { rows } = yield configs_1.default.query(query);
                res.status(200).json(rows);
            }
            catch (error) {
                res.status(500).json({ error: "Internal server error" });
            }
        });
    }
    count(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = "SELECT COUNT(*) FROM rooms;";
                const { rows } = yield configs_1.default.query(query);
                res.status(200).json(rows);
            }
            catch (error) {
                res.status(500).json({ error: "Internal server error" });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { room_type_id, name, description, image, status } = req.body;
                const initValue = [room_type_id, name, description, image, status];
                const insertQuery = "INSERT INTO rooms(room_type_id, name, description, image, status) VALUES($1, $2, $3, $4, $5)";
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
                const { rows } = yield configs_1.default.query(`SELECT * FROM rooms WHERE id = ${id}`);
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
                const { id, user_name, full_name, email, password, status } = req.body;
                const query = {
                    text: "UPDATE rooms SET user_name = $2, full_name = $3, email = $4, password = $5, status = $8 WHERE id = $1",
                    values: [id, user_name, full_name, email, password, status],
                };
                const { rowCount } = yield configs_1.default.query(query);
                if (rowCount === 0) {
                    return res.status(404).json({ error: "rooms not found" });
                }
                res.status(202).json({ message: "rooms updated successfully" });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "Internal server error" });
            }
        });
    }
}
exports.default = new roomController();
