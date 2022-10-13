module.exports = app => {
    const administrador = require("../controllers/administrador.controller.js");
    var router = require("express").Router();

    router.post("/", administrador.crearAdministrador);
    router.get("/all", administrador.obtenerAdministradores);
    router.get("/all/administradores-eventos", administrador.obtenerAdminEventosTickets);
    app.use('/api/administradores', router);
  };