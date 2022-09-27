//se importan las dependencias
const db = require("../models");
const Cliente = db.cliente;
const Usuario = db.usuario;
const Op = db.Sequelize.Op;

const { Sequelize, DataTypes } = require('sequelize');
//↓ para alterar las tablas, es necesario cambiar lo que está dentro de Sequelize(), ya que necesita el permiso del host↓
const sequelize = new Sequelize('itickets', 'root', 'ricardouv', {host: 'localhost', dialect: 'mysql'});
const queryInterface = sequelize.getQueryInterface();

//para crear un cliente
exports.crearCliente = async (req, res) => {
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
        let clientUser = await user.getClient()
        if(clientUser){
            res.send("El rut ingresado ya corresponde a un cliente")
            return;
        }

        let adminUser = await user.getAdministrator()
        if(adminUser){
            res.send("El usuario no puede ser cliente.\nYa se encuentra registrado como administrador")
            return;
        }

    }catch{
        res.status(400).send({
            message: "Error al encontrar el usuario asociado al rut",
        });
        return;
    }

    const dataCliente = {
        userRut: req.body.rutUsuario,
        num_contacto: req.body.numeroContacto,
        mail_contacto: req.body.mailContacto
    }
    
    //promesa para definir al cliente
    try{
        let client = await Cliente.create(dataCliente)
        res.send("Cliente definido")
    }catch{
        res.status(400).send({
            message: "Error al crear al cliente",
        });
    }
};

//retornar todos los clientes y sus datos (excepto su contrasena)
exports.obtenerClientes = async (req, res) => {

    try{
        let userClients = await Usuario.findAll({
            include: [
                {
                    model: Cliente,
                    required: true,
                    //attributes: ['num_contacto', 'mail_contacto']
                }
            ],
            attributes: ['rut','primer_nombre','primer_apellido','segundo_apellido']
        })
        res.send(userClients)
        return;
    }catch{
        res.status(400).send({
            message: "Error al obtener los clientes",
        });
        return;
    }
   
};

//añadir columna "tickets_vigentes"
exports.crearColumnaTicketsVigentes = async (req, res) => {

    try{
        let alter = await queryInterface.addColumn('clients', 'tickets_vigentes', {type: DataTypes.INTEGER, defaultValue: 0});
        let syncro = await sequelize.sync({alter: true});
        res.send('Columna añadida!')
        return;
    }catch{
        res.status(400).send({
            message: "Error",
        });
        return;
    }
}; 