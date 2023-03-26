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
exports.seederRoomType = void 0;
const configs_1 = __importDefault(require("../../configs"));
const room_type = [
    {
        name: "Phong 2 nguoi",
        count: 1,
        price: "500000",
    },
    {
        name: "Phong 3 nguoi",
        count: 2,
        price: "700000",
    },
    {
        name: "Phong 4 nguoi",
        count: 3,
        price: "1000000",
    },
];
const seederRoomType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Start a transaction
        yield configs_1.default.query("BEGIN");
        // Insert each user in parallel
        yield Promise.all(room_type.map((room) => __awaiter(void 0, void 0, void 0, function* () {
            const insertQuery = "INSERT INTO room_types(name, count, price) VALUES($1, $2, $3)";
            const insertValues = [room.name, room.count, room.price];
            yield configs_1.default.query(insertQuery, insertValues);
        })));
        // Commit the transaction
        const { rows } = yield configs_1.default.query("COMMIT");
        res.status(201).json(rows);
    }
    catch (err) {
        console.log(err);
        // Rollback the transaction if there was an error
        yield configs_1.default.query("ROLLBACK");
        res.status(500).json({ error: "Data seeding error" });
    }
});
exports.seederRoomType = seederRoomType;
