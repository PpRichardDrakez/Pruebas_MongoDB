const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../app'); // Asegúrate de exportar `app` desde tu archivo principal
const User = require('../models/User');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  await User.deleteMany();

  await User.create([
    { name: 'Ana López', email: 'ana@example.com', age: 25 },
    { name: 'Luis Díaz', email: 'luis@example.com', age: 32 }
  ]);
});

describe('Rutas de Usuarios - API', () => {
  it('GET /api/users - debería devolver todos los usuarios', async () => {
    const res = await request(app).get('/api/users');

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(2);
    expect(res.body[0]).toHaveProperty('email');
  });

  it('POST /api/users - debería crear un usuario', async () => {
    const newUser = {
      name: 'Carlos Ramírez',
      email: 'carlos@example.com',
      age: 28
    };

    const res = await request(app)
      .post('/api/users')
      .send(newUser);

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('Carlos Ramírez');
  });
  it('POST /api/users - debería fallar si falta el email o el nombre', async () => {
    const invalidUser = {
      age: 22
    };
  
    const res = await request(app)
      .post('/api/users')
      .send(invalidUser);
  
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });
  
});

