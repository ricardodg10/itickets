module.exports = app => {
    const evento = require("../controllers/evento.controller.js");
    var router = require("express").Router();

    router.post("/", evento.crearEvento);
    router.delete("/delete", evento.eliminarEvento);
    router.get("/filtros", evento.buscarEvento);
    app.use('/api/eventos', router);
  };