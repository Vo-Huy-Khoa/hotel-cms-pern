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
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rooms = yield configs_1.default.rooms.findMany({
                    select: {
                        id: true,
                        roomType: { select: { name: true } },
                        name: true,
                        description: true,
                        image: true,
                        status: true,
                        created_at: true,
                        updated_at: true,
                    },
                    orderBy: { id: 'desc' },
                });
                res.status(200).json(rooms);
            }
            catch (error) {
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
    count(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const count = yield configs_1.default.rooms.count();
                res.status(200).json(count);
            }
            catch (error) {
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { room_type_id, name, description, image, status } = req.body;
                const newStatus = status === 'true' ? true : false;
                const room = yield configs_1.default.rooms.create({
                    data: {
                        room_type_id: parseInt(room_type_id),
                        name,
                        description,
                        image,
                        status: newStatus,
                    },
                });
                res.status(201).json(room);
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
                const room = yield configs_1.default.rooms.findUnique({
                    where: { id: parseInt(id) },
                });
                res.status(202).json(room);
            }
            catch (error) {
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
    search(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { room_type_id, name, status } = req.body;
                const rooms = yield configs_1.default.rooms.findMany({
                    select: {
                        id: true,
                        roomType: { select: { name: true } },
                        name: true,
                        description: true,
                        image: true,
                        status: true,
                        created_at: true,
                        updated_at: true,
                    },
                    where: {
                        AND: [
                            name ? { name: { contains: name, mode: 'insensitive' } } : {},
                            room_type_id
                                ? { room_type_id: { equals: parseInt(room_type_id, 10) } }
                                : {},
                            status ? { status: status } : {},
                        ],
                    },
                    orderBy: { id: 'desc' },
                });
                res.status(202).json(rooms);
            }
            catch (error) {
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, room_type_id, name, description, image, status } = req.body;
                const updatedRoom = yield configs_1.default.rooms.update({
                    where: { id },
                    data: {
                        room_type_id: parseInt(room_type_id),
                        name,
                        description,
                        image,
                        status,
                    },
                });
                if (!updatedRoom) {
                    return res.status(404).json({ error: 'rooms not found' });
                }
                res.status(202).json({ message: 'rooms updated successfully' });
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
                const deletedRoom = yield configs_1.default.rooms.delete({
                    where: { id: parseInt(id) },
                });
                res.status(202).json(deletedRoom);
            }
            catch (error) {
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
}
exports.default = new roomController();
