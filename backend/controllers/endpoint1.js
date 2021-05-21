const endpoint1Router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Usuario = require("../models/usuarios");
const authJWT = require("../middleware/authJWT");
endpoint1Router.get("/", authJWT.verifyToken, async (req, res) => {
  const usuarios = await Usuario.find({}).select("-_id -password -__v");
  res.send(usuarios);
});
endpoint1Router.post("/", async (req, res) => {
  try {
    const password = bcrypt.hashSync(req.body.password, 8);
    const usuario = new Usuario({ ...req.body, password: password });
    await usuario.save();
    res.send({ message: "Guardado!" });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});
endpoint1Router.post("/signin", async (req, res) => {
  if (!req.body.cedula) {
    res.status(400).send({ message: "Ingrese una cedula" });
  }
  const usuario = await Usuario.findOne({ cedula: req.body.cedula });
  if (!usuario) {
    res.status(404).send({ message: "Correo no registrado" });
  }
  const password = bcrypt.compareSync(req.body.password, usuario.password);
  if (password) {
    const token = jwt.sign(
      { nombre: usuario.nombre, apellido: usuario.apellido },
      "soloyoseesto",
      {
        expiresIn: 30, // 24 hours
      }
    );
    res.send({ message: "logueado", token: token });
  } else {
    res.status(404).send({ message: "Wrong password" });
  }
});

module.exports = endpoint1Router;
