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
class room_typesController {
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const room_types = yield configs_1.default.room_types.findMany({
                    orderBy: { id: 'desc' },
                });
                res.status(200).json(room_types);
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
    count(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const count = yield configs_1.default.room_types.count();
                res.status(200).json({ count });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, count, price } = req.body;
                const room_types = yield configs_1.default.room_types.create({
                    data: { name, count, price },
                });
                res.status(201).json(room_types);
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Create Room Type Fail!' });
            }
        });
    }
    find(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const room_types = yield configs_1.default.room_types.findUnique({
                    where: { id: parseInt(id) },
                });
                if (!room_types) {
                    return res.status(404).json({ error: 'room_types not found' });
                }
                res.status(202).json(room_types);
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
    search(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, count, price } = req.body;
                const room_types = yield configs_1.default.room_types.findMany({
                    where: {
                        AND: [
                            name ? { name: { contains: name, mode: 'insensitive' } } : {},
                            count ? { count: { gte: parseInt(count, 10) } } : {},
                            price ? { price: { equals: parseFloat(price) } } : {},
                        ],
                    },
                });
                res.status(202).json(room_types);
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, name, count, price } = req.body;
                const room_types = yield configs_1.default.room_types.update({
                    where: { id: parseInt(id) },
                    data: { name, count, price },
                });
                if (!room_types) {
                    return res.status(404).json({ error: 'room_types not found' });
                }
                res.status(202).json({ message: 'room_types updated successfully' });
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
                const deleteRoomType = yield configs_1.default.room_types.delete({
                    where: { id: parseInt(id) },
                });
                res.status(202).json(deleteRoomType);
            }
            catch (error) {
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
}
exports.default = new room_typesController();
