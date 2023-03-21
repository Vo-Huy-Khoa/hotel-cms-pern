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
exports.seederHotel = void 0;
const configs_1 = __importDefault(require("../../configs"));
const hotels = [
    {
        name: "Son Tra",
        address: "Son Tra, Da Nang",
        phone: "0977425396",
        description: "Hotel is ...",
    },
    {
        name: "Muong Thanh",
        address: "Son Tra, Da Nang",
        phone: "0977425396",
        description: "Hotel is ...",
    },
    {
        name: "Ngu Hanh Son",
        address: "Ngu Hanh Son, Da Nang",
        phone: "0977425396",
        description: "Hotel is ...",
    },
];
const seederHotel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Start a transaction
        yield configs_1.default.query("BEGIN");
        // Insert each user in parallel
        yield Promise.all(hotels.map((hotel) => __awaiter(void 0, void 0, void 0, function* () {
            const insertQuery = "INSERT INTO hotels(name, address, phone, description) VALUES($1, $2, $3, $4)";
            const insertValues = [
                hotel.name,
                hotel.address,
                hotel.phone,
                hotel.description,
            ];
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
exports.seederHotel = seederHotel;
