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
exports.seederUser = void 0;
const configs_1 = __importDefault(require("../../configs"));
const users = [
    {
        user_name: "khoavh",
        full_name: "vo huy khoa",
        email: "huykhoa630@gmail.com",
        password: "1",
        identity_number: "2006444928",
        phone: "0977425396",
        role: "0",
    },
    {
        user_name: "anhthy",
        full_name: "Anh Thy",
        email: "anhthy@gmail.com",
        password: "1",
        identity_number: "2006444928",
        phone: "0977425396",
        role: "0",
    },
    {
        user_name: "ngockhue",
        full_name: "Ngoc Khue",
        email: "ngockhue0@gmail.com",
        password: "1",
        identity_number: "2006444928",
        phone: "0977425396",
        role: "1",
    },
    {
        user_name: "jennie",
        full_name: "Jennie",
        email: "jennie@gmail.com",
        password: "1",
        identity_number: "2006444928",
        phone: "0977425396",
        role: "1",
    },
];
const seederUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Start a transaction
        yield configs_1.default.query("BEGIN");
        // Insert each user in parallel
        yield Promise.all(users.map((user) => __awaiter(void 0, void 0, void 0, function* () {
            const insertQuery = "INSERT INTO users(user_name, full_name, email, password, identity_number, phone,  role) VALUES($1, $2, $3, $4, $5, $6, $7)";
            const insertValues = [
                user.user_name,
                user.full_name,
                user.email,
                user.password,
                user.identity_number,
                user.phone,
                user.role,
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
exports.seederUser = seederUser;
