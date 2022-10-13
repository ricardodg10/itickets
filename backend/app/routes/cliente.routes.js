module.exports = app => {
    const cliente = require("../controllers/cliente.controller.js");
    var router = require("express").Router();

    router.post('/', cliente.crearCliente);
    router.get('/all', cliente.obtenerClientes);
    app.use('/api/clientes', router);
  };