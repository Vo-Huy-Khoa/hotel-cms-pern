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
class clientController {
    // Retrieve all users from the database
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const clients = yield configs_1.default.clients.findMany({
                    orderBy: {
                        id: 'desc',
                    },
                });
                res.status(200).json(clients);
            }
            catch (error) {
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
    count(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const count = yield configs_1.default.clients.count();
                res.status(200).json({ count });
            }
            catch (error) {
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, identity_number, phone } = req.body;
                const client = yield configs_1.default.clients.create({
                    data: {
                        name,
                        email,
                        identity_number,
                        phone,
                    },
                });
                res.status(201).json(client);
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
    find(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const client = yield configs_1.default.clients.findUnique({
                    where: {
                        id: Number(id),
                    },
                });
                res.status(202).json(client);
            }
            catch (error) {
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, name, email, identity_number, phone } = req.body;
                const client = yield configs_1.default.clients.update({
                    where: {
                        id: Number(id),
                    },
                    data: {
                        name,
                        email,
                        identity_number,
                        phone,
                    },
                });
                if (!client) {
                    return res.status(404).json({ error: 'clients not found' });
                }
                res.status(202).json({ message: 'clients updated successfully' });
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
                const client = yield configs_1.default.clients.delete({
                    where: {
                        id: Number(id),
                    },
                });
                if (!client) {
                    return res.status(404).json({ error: 'clients not found' });
                }
                res.status(202).json({ message: 'clients deleted successfully' });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
}
exports.default = new clientController();
