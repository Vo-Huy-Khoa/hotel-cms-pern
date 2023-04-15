import app from '../server';
import request from 'supertest';

describe('GET /api/users', () => {
  it('should return all users', async () => {
    const token = 'my-token';
    const res = await request(app)
      .get('/api/user')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

describe('POST /api/user/create', () => {
  it('should return a user', async () => {
    const token = 'my-token';
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
  });
});

describe('POST /api/user/update', () => {
  it('should return user update', async () => {
    const token = 'my-token';
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
  });
});
