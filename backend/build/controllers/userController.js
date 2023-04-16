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
const bcrypt_1 = __importDefault(require("bcrypt"));
const configs_1 = __importDefault(require("../configs"));
class userController {
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield configs_1.default.users.findMany({ orderBy: { id: 'desc' } });
                res.status(200).json(users);
            }
            catch (err) {
                console.error(err);
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
    count(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const count = yield configs_1.default.users.count();
                res.status(200).json(count);
            }
            catch (err) {
                console.error(err);
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { user_name, full_name, email, password: oldPassword, status, } = req.body;
                const password = yield bcrypt_1.default.hash(oldPassword, 10);
                const user = yield configs_1.default.users.create({
                    data: {
                        user_name,
                        full_name,
                        email,
                        password,
                        status,
                    },
                });
                res.status(201).json(user);
            }
            catch (err) {
                console.error(err);
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
    find(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const user = yield configs_1.default.users.findUnique({
                    where: { id: parseInt(id) },
                });
                res.status(202).json(user);
            }
            catch (err) {
                console.error(err);
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
    search(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { full_name, email } = req.body;
                const users = yield configs_1.default.users.findMany({
                    where: {
                        full_name: {
                            contains: full_name,
                            mode: 'insensitive',
                        },
                        email: {
                            contains: email,
                            mode: 'insensitive',
                        },
                    },
                });
                res.status(202).json(users);
            }
            catch (error) {
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, user_name, full_name, email, status } = req.body;
                const updatedUser = yield configs_1.default.users.update({
                    where: {
                        id,
                    },
                    data: {
                        user_name,
                        full_name,
                        email,
                        status,
                    },
                });
                if (!updatedUser) {
                    return res.status(404).json({ error: 'User not found' });
                }
                res.status(200).json({ message: 'User updated successfully!' });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield configs_1.default.users.delete({
                    where: {
                        id: parseInt(id),
                    },
                });
                res.status(200).json({ message: 'User delete successfully!' });
            }
            catch (error) {
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
}
exports.default = new userController();
