const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const User = require('../models/User'); // Ajusta la ruta si es distinta

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

beforeEach(async () => {
  await User.deleteMany();
});

describe('Modelo de Usuario', () => {
  it('debería insertar un usuario correctamente', async () => {
    const userData = { name: 'Juan Pérez', email: 'juan@example.com', age: 30 };
    const user = await User.create(userData);

    expect(user).toMatchObject(userData);
  });

  it('debería rechazar si falta el campo email', async () => {
    const userData = { name: 'Sin Correo' };

    await expect(User.create(userData)).rejects.toThrow();
  });
});


