//se importan las dependencias
const db = require("../models");
const Cliente = db.cliente;
const Administrador = db.administrador;
const Usuario = db.usuario;
const Op = db.Sequelize.Op;

//para crear un cliente
exports.crearCliente = async (req, res) => {

    if(!req.body.rut || !req.body.nombre || !req.body.primerApellido || !req.body.segundoApellido || 
        !req.body.contrasenia || !req.body.confirmarContrasenia || !req.body.numeroContacto || !req.body.mailContacto){

        return res.status(400).send({
            error: "Debe rellenar todos los campos"})
        }

    if(req.body.contrasenia != req.body.confirmarContrasenia){
        return res.status(400).send({
            error: "Contrasenas no coinciden"})
        }

    try{
        let client = await Cliente.findByPk(req.body.rut);
        if(client){
            res.send("El rut ya corresponde a un cliente")
            return;
        }

        let admin = await Administrador.findByPk(req.body.rut);
        if(admin){
            res.send("El rut corresponde a un administrador")
            return;
        }

    }catch{
        return res.status(400).send({
            error: "Error en la consulta"})
    }

    const dataUser = {
        rut: req.body.rut,
        primer_nombre: req.body.nombre,
        primer_apellido: req.body.primerApellido,
        segundo_apellido: req.body.segundoApellido,
        contrasenia: req.body.contrasenia,
    };

    const dataClient = {
        userRut: req.body.rut,
        num_contacto: req.body.numeroContacto,
        mail_contacto: req.body.mailContacto,
    };

    try{
        let user = await Usuario.create(dataUser)
        let client = await Cliente.create(dataClient);
        
        let findClient = await Usuario.findOne({
            where: {
                rut: user.rut
            },
            include: {
                model: Cliente,
                attributes: ['num_contacto', 'mail_contacto']
            },
            attributes: {exclude: ['createdAt', 'updatedAt']}
            
        })

        res.send(findClient);
        return;


    }catch{
        return res.status(400).send({
            error: "Error al crear al cliente"})

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
                    attributes:  ['num_contacto', 'mail_contacto']
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
