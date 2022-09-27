//se importan las dependencias
const db = require("../models");
const Administrador = db.administrador;
const Usuario = db.usuario;
const Evento = db.evento;
const Op = db.Sequelize.Op;

const { Sequelize, DataTypes } = require('sequelize');
const { query } = require("express");
const sequelize = new Sequelize('itickets', 'root', 'ricardouv', {host: 'localhost', dialect: 'mysql'});
const queryInterface = sequelize.getQueryInterface();

//para crear un administrador
exports.create = async (req, res) => {

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


    //se valida que se ingreso un rut
    if(!req.body.rutUsuario){
        res.status(400).send({
            message: "Debe ingresar un rut de usuario",
        });
        return;
    }

    //promesa de buscar al usuario y comprobar si es cliente o administrador
    try{
        let user = await Usuario.findByPk(req.body.rutUsuario);
        let adminUser = await user.getAdministrator()
        if(adminUser){
            res.send("El rut ingresado ya corresponde a un administrador.")
            return;
        }

        let clientUser = await user.getClient()
        if(clientUser){
            res.send("El usuario no puede ser administrador.\nYa se encuentra registrado como cliente.")
            return;
        }
    }catch{
        res.status(400).send({
            message: "Error al encontrar el usuario asociado al rut",
        });
        return;
    }

    const dataAdministrador = {
        userRut: req.body.rutUsuario,
        anios_experiencia: req.body.aniosExperiencia
    }
    
    //promesa para definir al administrador
    try{
        let admin = await Administrador.create(dataAdministrador)
        res.send("Administrador definido")
    }catch{
        res.status(400).send({
            message: "Error al crear al administrador",
        });
        return;
    }
};

//retornar todos los administradores y sus datos (excepto su contrasena)
exports.obtenerAdministradores = async (req, res) => {

    try{
        let userAdmins = await Usuario.findAll({
            include: [
                {
                    model: Administrador,
                    required: true,
                    attributes: ['anios_experiencia']
                }
            ],
            attributes: ['rut','primer_nombre','primer_apellido','segundo_apellido']
        })
        res.send(userAdmins)
        return;
    }catch{
        res.status(400).send({
            message: "Error al obtener los administradores",
        });
        return;
    }
};

//retornar los administradores, sus eventos y la cantidad de tickets disponibles

exports.obtenerAdminEventosTickets = async (req, res) => {


    try{
        let admins = await Usuario.findAll({
            include: [
                {
                    model: Administrador,
                    required: true,
                    include: [
                        {
                        model: Evento,
                        required: true,
                        attributes: ['nombre_evento'],
                        }
                    ],
                    attributes: ['userRut'],
                }
            ],
            attributes: ['primer_nombre','primer_apellido','segundo_apellido'],
        })
        res.send(admins)

        return;

    }catch{
        res.status(400).send({
            message: "Error al obtener los administradores",
        });
        return;
    }
}

//añadir columna "eventos_vigentes"
exports.crearColumnaEventosVigentes = async (req, res) => {

    queryInterface.addColumn('administrators', 'eventos_vigentes', {type: DataTypes.INTEGER, defaultValue: 0});
    res.send('Columna añadida!')
    return;
};


