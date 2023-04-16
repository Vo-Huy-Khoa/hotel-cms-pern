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
exports.token = void 0;
const server_1 = __importDefault(require("../server"));
const supertest_1 = __importDefault(require("supertest"));
let token;
exports.token = token;
describe('POST /api/register', () => {
    it('should create a new user', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = {
            full_name: 'Vo Huy Khoa',
            user_name: 'khoavh',
            email: 'khoavh@gmail.com',
            password: '1',
        };
        const res = yield (0, supertest_1.default)(server_1.default).post('/api/auth/register').send(user);
        expect(res.status).toEqual(201);
        expect(res.body).toHaveProperty('full_name', user.full_name);
        expect(res.body).toHaveProperty('user_name', user.user_name);
        expect(res.body).toHaveProperty('email', user.email);
    }));
});
describe('POST Login', () => {
    it('should return a token if login is successful', () => __awaiter(void 0, void 0, void 0, function* () {
        const userData = {
            user_name: 'khoavh',
            password: '1',
        };
        const res = yield (0, supertest_1.default)(server_1.default).post('/api/auth/login').send(userData);
        expect(res.status).toEqual(200);
        expect(res.body.token).toBeTruthy();
        exports.token = token = res.body.token;
    }));
    it('should return an error if email or password is incorrect', () => __awaiter(void 0, void 0, void 0, function* () {
        const userData = {
            user_name: 'khoavh',
            password: '2',
        };
        const res = yield (0, supertest_1.default)(server_1.default).post('/api/auth/login').send(userData);
        expect(res.status).toEqual(401);
        expect(res.body.error).toEqual('Invalid user_name or password');
    }));
});
