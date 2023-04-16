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
const server_1 = __importDefault(require("../server"));
const supertest_1 = __importDefault(require("supertest"));
const authController_test_1 = require("./authController.test");
let user_id;
describe('GET /api/users', () => {
    it('should return all users', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.default)
            .get('/api/user')
            .set('Authorization', `Bearer ${authController_test_1.token}`);
        expect(res.status).toEqual(200);
        expect(res.body.length).toBeGreaterThan(0);
    }));
});
describe('POST /api/user/create', () => {
    it('should return a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = {
            full_name: 'Vo Huy Khoa',
            user_name: 'khoavh',
            email: 'khoavh@gmail.com',
            password: '1',
        };
        const res = yield (0, supertest_1.default)(server_1.default)
            .post('/api/user/create')
            .set('Authorization', `Bearer ${authController_test_1.token}`)
            .send(user);
        expect(res.status).toEqual(201);
        expect(res.body).toHaveProperty('full_name', user.full_name);
        expect(res.body).toHaveProperty('user_name', user.user_name);
        expect(res.body).toHaveProperty('email', user.email);
        user_id = res.body.id;
    }));
});
describe('PUT /api/user/update', () => {
    it('should return user update', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = {
            id: user_id,
            full_name: 'Vo Huy Khoa',
            user_name: 'khoavh',
            email: 'khoavh@gmail.com',
            password: '1',
        };
        const res = yield (0, supertest_1.default)(server_1.default)
            .put('/api/user/update')
            .set('Authorization', `Bearer ${authController_test_1.token}`)
            .send(user);
        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty('message', 'User updated successfully!');
    }));
});
describe('DELETE /api/user/delete/id', () => {
    it('should return user delete', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.default)
            .delete(`/api/user/delete/${user_id}`)
            .set('Authorization', `Bearer ${authController_test_1.token}`);
        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty('message', 'User delete successfully!');
    }));
});
