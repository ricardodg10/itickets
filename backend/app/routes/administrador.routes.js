module.exports = app => {
    const administrador = require("../controllers/administrador.controller.js");
    var router = require("express").Router();

    router.post("/", administrador.create);
    router.get("/all", administrador.obtenerAdministradores);
    router.get("/all/administradores-eventos", administrador.obtenerAdminEventosTickets);
    router.patch("/new-column", administrador.crearColumnaEventosVigentes);
    app.use('/api/administradores', router);
  };