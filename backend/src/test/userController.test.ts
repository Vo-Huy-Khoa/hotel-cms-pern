import app from '../server';
import request from 'supertest';
import { token } from './authController.test';

let user_id: number;

describe('GET /api/users', () => {
  it('should return all users', async () => {
    const res = await request(app)
      .get('/api/user')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

describe('POST /api/user/create', () => {
  it('should return a user', async () => {
    const user = {
      full_name: 'Vo Huy Khoa',
      user_name: 'khoavh',
      email: 'khoavh@gmail.com',
      password: '1',
    };
    const res = await request(app)
      .post('/api/user/create')
      .set('Authorization', `Bearer ${token}`)
      .send(user);
    expect(res.status).toEqual(201);
    expect(res.body).toHaveProperty('full_name', user.full_name);
    expect(res.body).toHaveProperty('user_name', user.user_name);
    expect(res.body).toHaveProperty('email', user.email);
    user_id = res.body.id;
  });
});

describe('PUT /api/user/update', () => {
  it('should return user update', async () => {
    const user = {
      id: user_id,
      full_name: 'Vo Huy Khoa',
      user_name: 'khoavh',
      email: 'khoavh@gmail.com',
      password: '1',
    };
    const res = await request(app)
      .put('/api/user/update')
      .set('Authorization', `Bearer ${token}`)
      .send(user);
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty('message', 'User updated successfully!');
  });
});

describe('DELETE /api/user/delete/id', () => {
  it('should return user delete', async () => {
    const res = await request(app)
      .delete(`/api/user/delete/${user_id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty('message', 'User delete successfully!');
  });
});
