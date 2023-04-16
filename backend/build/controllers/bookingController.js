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
class bookingController {
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bookings = yield configs_1.default.bookings.findMany({
                    select: {
                        id: true,
                        client_id: true,
                        room_id: true,
                        room: {
                            select: {
                                name: true,
                            },
                        },
                        client: {
                            select: {
                                name: true,
                            },
                        },
                        check_in: true,
                        check_out: true,
                        total_price: true,
                        created_at: true,
                        updated_at: true,
                    },
                    where: {
                        status: true,
                    },
                    orderBy: {
                        id: 'desc',
                    },
                });
                res.status(200).json(bookings);
            }
            catch (error) {
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
    totalMoney(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const total = yield configs_1.default.bookings.aggregate({
                    _sum: {
                        total_price: true,
                    },
                });
                res.status(200).json({ sum: total });
            }
            catch (error) {
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
    countCheckIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const count = yield configs_1.default.bookings.count({
                    where: {
                        check_in: new Date().toISOString().slice(0, 10),
                    },
                });
                res.status(200).json({ count });
            }
            catch (error) {
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
    countCheckOut(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const count = yield configs_1.default.bookings.count({
                    where: {
                        check_out: new Date().toISOString().slice(0, 10),
                    },
                });
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
                const { room_id, client_id, check_in, check_out, total_price } = req.body;
                const checkIn = new Date(check_in);
                const checkOut = new Date(check_out);
                const booking = yield configs_1.default.bookings.create({
                    data: {
                        room_id: parseInt(room_id),
                        client_id: client_id,
                        check_in: checkIn,
                        check_out: checkOut,
                        total_price,
                        status: true,
                    },
                });
                res.status(201).json(booking);
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
                const booking = yield configs_1.default.bookings.findUnique({
                    where: {
                        id: Number(id),
                    },
                });
                res.status(202).json(booking);
            }
            catch (error) {
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
    search(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { room_id, name, check_in, check_out } = req.body;
                const where = { status: true, room: {}, client: {} };
                if (room_id)
                    where.room.id = { equals: parseInt(room_id, 10) };
                if (name)
                    where.client.name = { contains: name, mode: 'insensitive' };
                if (check_in)
                    where.check_in = new Date(check_in);
                if (check_out)
                    where.check_out = new Date(check_out);
                const bookings = yield configs_1.default.bookings.findMany({
                    where,
                    orderBy: { id: 'desc' },
                    select: {
                        id: true,
                        client_id: true,
                        room_id: true,
                        total_price: true,
                        check_in: true,
                        check_out: true,
                        created_at: true,
                        updated_at: true,
                        room: { select: { name: true } },
                        client: { select: { name: true } },
                    },
                });
                res.status(202).json(bookings);
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
                const { id, room_id, client_id, check_in, check_out, total_price, status, } = req.body;
                const booking = yield configs_1.default.bookings.update({
                    where: { id: id },
                    data: {
                        room_id: room_id,
                        client_id: client_id,
                        check_in: check_in ? new Date(check_in) : null,
                        check_out: check_out ? new Date(check_out) : null,
                        total_price: total_price,
                        status: status,
                    },
                });
                if (!booking) {
                    return res.status(404).json({ error: 'Booking not found' });
                }
                res.status(202).json({ message: 'Booking updated successfully' });
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
                const booking = yield configs_1.default.bookings.delete({
                    where: { id: parseInt(id) },
                });
                res.status(202).json(booking);
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
}
exports.default = new bookingController();
