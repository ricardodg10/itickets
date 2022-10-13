//se importan las dependencias
const { response } = require("express");
const db = require("../models");
const Usuario = db.usuario;
const Op = db.Sequelize.Op;

//para crear un usuario
exports.crearUsuario = async (req, res) => {
    //validar el ingreso de un usuario
    if(!req.body.rut || !req.body.primerNombre || !req.body.primerApellido || !req.body.segundoApellido || !req.body.contrasenia){
        res.status(400).send({
            message: "Debe rellenar todos los campos"
        });
        return;
    } 

    try{
        let usuarioEncontrado = await Usuario.findByPk(req.body.rut)
        if(usuarioEncontrado){
            res.send("El rut ingresado ya está registrado en un usuario")
            return;
        }
    }catch{
        res.status(400).send({
            message: "Error en la comprobacion de rut en los registros"
        });
    }
    //instanciar un usuario
    const usuario = {
        rut: req.body.rut,
        primer_nombre: req.body.primerNombre,
        primer_apellido: req.body.primerApellido,
        segundo_apellido: req.body.segundoApellido,
        contrasenia: req.body.contrasenia
    };

    //guardar usuario en la base de datos
    Usuario.create(usuario)
        .then(data=> {
            res.send(data);
        })
        .catch(err=> {
            res.status(500).send({
                message:
                    err.message || "Error al ingresar un usuario"
            });
        });

        
};

//retornar todos los usuarios
exports.obtenerUsuarios = (req, res) => {
    const rut = req.query.rut;
    var condicion = rut? {rut: {[Op.like]: `%${rut}%`}} : null;
    Usuario.findAll({where: condicion})
        .then(data=> {
            res.send(data);
        })
        .catch(err=>{
            res.status(500).send({
                message:
                    err.message || "Error en la busqueda"
            });
        });
};

//obtener usuario por rut (pk)
exports.obtenerUsuarioPk = (req, res) => {
    const rut = req.params.rut;
    Usuario.findByPk(rut)
        .then(data=>{
            if(data){
                res.send(data);
            }else{
                res.status(404).send({
                    message: `No se encontro a un usuario con el rut consultado`
                });
            }
        })
        .catch(err=>{
            res.status(400).send({
                message: "Error en la busqueda por rut",
            });
        });
};

// eliminar un usuario
exports.eliminarUsuario = async (req, res) => {

    if(!req.body.rutUsuario, !req.body.contrasenia){
        res.send('Debe rellenar los campos')
        return;
    }

    try{
        let usuario = await Usuario.findByPk(req.body.rutUsuario)

        if(!usuario){
            res.status(404).send({
                message: `No se encontro a un usuario con el rut`
            })
            return;
        }

        if(usuario.contrasenia == req.body.contrasenia){
            try{
                let eliminar = await Usuario.destroy({where: {rut : req.body.rutUsuario}});
                res.send('Usuario eliminado')
                return;
            }catch{
                res.status(400).send({
                    message: `Error al eliminar al usuario`,
                });
                return;
            }
        }
    }catch{
        res.status(400).send({
            message: "Error en la consulta",

        });
        return;
    }
};

//para cambiar la contraseña de un usuario
exports.cambiarContrasenia = async (req, res) => {

    if(!req.body.rut || !req.body.contrasenaActual || !req.body.contrasenaNueva){
        res.send('Debe rellenar todos los campos')
        return;
    }

    try{
        let usuario = await Usuario.findByPk(req.body.rut);

        if(usuario){
            if(usuario.contrasenia == req.body.contrasenaActual){

                usuario.set({
                    contrasenia: req.body.contrasenaNueva,
                });
                await usuario.save();

                res.send(usuario)
                return;

            }else{
                res.send('La contrasena actual no es la misma que la ingresada')
                return;
            }

        }else{
            res.send('No se ha encontrado al usuario')
            return;
        }

    }catch{
        res.status(400).send({
            message: `Error al cambiar la contrasena del usuario`,
        });
        return;
    }

};