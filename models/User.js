const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    minlength: [3, 'El nombre debe tener al menos 3 caracteres']
  },
  email: {
    type: String,
    required: [true, 'El correo es obligatorio'],
    unique: true,
    match: [/.+\@.+\..+/, 'El correo debe tener un formato válido']
  },
  age: {
    type: Number,
    min: [0, 'La edad no puede ser negativa'],
    max: [100, 'La edad no puede ser mayor a 100']
  }
});

module.exports = mongoose.model('User', userSchema);
