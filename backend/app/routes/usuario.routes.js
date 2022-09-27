module.exports = app => {
    const usuario = require("../controllers/usuario.controller.js");
    var router = require("express").Router();

    router.post("/", usuario.crearUsuario);
    router.get("/", usuario.obtenerUsuarios);
    router.get("/:rut", usuario.obtenerUsuarioPk);
    router.delete("/delete", usuario.eliminarUsuario);
    router.put("/new-password", usuario.cambiarContrasenia);
    app.use('/api/usuarios', router);
  };