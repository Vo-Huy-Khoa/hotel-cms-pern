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
const bcrypt_1 = __importDefault(require("bcrypt"));
const users = [
    {
        user_name: "anhthy",
        full_name: "Anh Thy",
        email: "anhthy@gmail.com",
        password: "1",
        status: "0",
    },
    {
        user_name: "ngockhue",
        full_name: "Ngoc Khue",
        email: "ngockhue0@gmail.com",
        password: "1",
        status: "1",
    },
    {
        user_name: "jennie",
        full_name: "Jennie",
        email: "jennie@gmail.com",
        password: "1",
        status: "1",
    },
    {
        user_name: "thaodoan",
        full_name: "Doan Thi Thao",
        email: "thaodoan@gmail.com",
        password: "1",
        status: "1",
    },
    {
        user_name: "trungdien",
        full_name: "Vo Trung Dien",
        email: "trungdien@gmail.com",
        password: "1",
        status: "0",
    },
    {
        user_name: "ngockhue",
        full_name: "Ngoc Khue",
        email: "ngockhue0@gmail.com",
        password: "1",
        status: "1",
    },
    {
        user_name: "jennie",
        full_name: "Jennie",
        email: "jennie@gmail.com",
        password: "1",
        status: "1",
    },
    {
        user_name: "anhthy",
        full_name: "Anh Thy",
        email: "anhthy@gmail.com",
        password: "1",
        status: "0",
    },
    {
        user_name: "ngockhue",
        full_name: "Ngoc Khue",
        email: "ngockhue0@gmail.com",
        password: "1",
        status: "1",
    },
    {
        user_name: "jennie",
        full_name: "Jennie",
        email: "jennie@gmail.com",
        password: "1",
        status: "1",
    },
    {
        user_name: "anhthy",
        full_name: "Anh Thy",
        email: "anhthy@gmail.com",
        password: "1",
        status: "0",
    },
    {
        user_name: "ngockhue",
        full_name: "Ngoc Khue",
        email: "ngockhue0@gmail.com",
        password: "1",
        status: "1",
    },
    {
        user_name: "jennie",
        full_name: "Jennie",
        email: "jennie@gmail.com",
        password: "1",
        status: "1",
    },
];
const seederUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Start a transaction
        yield configs_1.default.query("BEGIN");
        // Insert each user in parallel
        yield Promise.all(users.map((user) => __awaiter(void 0, void 0, void 0, function* () {
            const insertValues = [
                user.user_name,
                user.full_name,
                user.email,
                bcrypt_1.default.hash(user.password, 10),
                user.status,
            ];
            const insertQuery = "INSERT INTO users(user_name, full_name, email, password, status) VALUES($1, $2, $3, $4, $5)";
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
