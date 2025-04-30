const express = require('express');
const router = express.Router();
const User = require('../models/User');

// CREATE
router.post('/users', async (req, res) => {
  console.log("Body recibido:", req.body); // <--- línea de depuración

  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ
router.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// UPDATE
router.put('/users/:id', async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE
router.delete('/users/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "Usuario eliminado" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
