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
exports.seederClient = void 0;
const configs_1 = __importDefault(require("../../configs"));
const clients = [
    {
        name: "Vo Huy Khoa",
        email: "huykhoa630@gmail.com",
        identity_number: "206444928",
        phone: "0977425396",
    },
    {
        name: "Tran Thi Anh Thy",
        email: "anhthy@gmail.com",
        identity_number: "206444928",
        phone: "0796565798",
    },
    {
        name: "Vo Doan Ngoc Khue",
        email: "ngockhue0@gmail.com",
        identity_number: "206444928",
        phone: "0977425396",
    },
    {
        name: "Jennie",
        email: "jennie@gmail.com",
        identity_number: "206444928",
        phone: "0977425396",
    },
];
const seederClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Start a transaction
        yield configs_1.default.query("BEGIN");
        // Insert each client in parallel
        yield Promise.all(clients.map((client) => __awaiter(void 0, void 0, void 0, function* () {
            const insertValues = [
                client.name,
                client.email,
                client.identity_number,
                client.phone,
            ];
            const insertQuery = "INSERT INTO clients(name, email, identity_number, phone) VALUES($1, $2, $3, $4)";
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
exports.seederClient = seederClient;
