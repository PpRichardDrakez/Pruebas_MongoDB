const express = require('express');
const userRoutes = require('./routes/users');

const app = express();

// Middleware para leer JSON
app.use(express.json());

// Rutas
app.use('/api', userRoutes);

module.exports = app;
