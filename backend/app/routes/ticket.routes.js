module.exports = app => {
    const ticket = require("../controllers/ticket.controller.js");
    var router = require("express").Router();

    router.put("/asignar", ticket.asignarTicket);
    router.delete("/drop-table", ticket.dropTicket);
    app.use('/api/tickets', router);
  };