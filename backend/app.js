const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const endpoint1Router = require("./controllers/endpoint1");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/usuarios", endpoint1Router);

mongoose
  .connect(
    "mongodb://digital:d3partament0BI@edn-shard-00-00.szgrd.mongodb.net:27017,edn-shard-00-01.szgrd.mongodb.net:27017,edn-shard-00-02.szgrd.mongodb.net:27017/prueba2?ssl=true&replicaSet=atlas-130d48-shard-0&authSource=admin&retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

module.exports = app;
