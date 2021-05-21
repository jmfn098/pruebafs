const mongoose = require("mongoose");
const UsuarioSchema = new mongoose.Schema({
  nombre: String,
  apellido: String,
  cedula: { type: Number, required: true },
  password: { type: String, required: true },
});
const Usuario = new mongoose.model("Usuario", UsuarioSchema);
module.exports = Usuario;
