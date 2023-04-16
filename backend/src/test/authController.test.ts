import app from '../server';
import request from 'supertest';

let token: string;

describe('POST /api/register', () => {
  it('should create a new user', async () => {
    const user = {
      full_name: 'Vo Huy Khoa',
      user_name: 'khoavh',
      email: 'khoavh@gmail.com',
      password: '1',
    };
    const res = await request(app).post('/api/auth/register').send(user);
    expect(res.status).toEqual(201);
    expect(res.body).toHaveProperty('full_name', user.full_name);
    expect(res.body).toHaveProperty('user_name', user.user_name);
    expect(res.body).toHaveProperty('email', user.email);
  });
});
describe('POST Login', () => {
  it('should return a token if login is successful', async () => {
    const userData = {
      user_name: 'khoavh',
      password: '1',
    };
    const res = await request(app).post('/api/auth/login').send(userData);
    expect(res.status).toEqual(200);
    expect(res.body.token).toBeTruthy();
    token = res.body.token;
  });

  it('should return an error if email or password is incorrect', async () => {
    const userData = {
      user_name: 'khoavh',
      password: '2',
    };
    const res = await request(app).post('/api/auth/login').send(userData);
    expect(res.status).toEqual(401);
    expect(res.body.error).toEqual('Invalid user_name or password');
  });
});

export { token };
