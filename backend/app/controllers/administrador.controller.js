//se importan las dependencias
const db = require("../models");
const Administrador = db.administrador;
const Usuario = db.usuario;
const Cliente = db.cliente;
const Evento = db.evento;
const Ticket = db.ticket;
const Sequelize = db.Sequelize;


//para crear un cliente
exports.crearAdministrador = async (req, res) => {


    if(!req.body.rut || !req.body.nombre || !req.body.primerApellido || !req.body.primerApellido || !req.body.segundoApellido || 
        !req.body.contrasenia || !req.body.confirmarContrasenia){

        return res.status(400).send({
            error: "Debe rellenar todos los campos"})
    }

    if(req.body.contrasenia != req.body.confirmarContrasenia){
        return res.status(400).send({
            error: "Contrasenas no coinciden"})
    }


    try{
        let admin = await Administrador.findByPk(req.body.rut);
        if(admin){
            res.send("El rut ya corresponde a un administrador")
            return;
        }

        let client = await Cliente.findByPk(req.body.rut);
        if(client){
            res.send("El rut corresponde a un cliente")
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

    const dataAdmin = {
        userRut: req.body.rut,
        anios_experiencia: req.body.aniosExperiencia,
    };

    try{
        let user = await Usuario.create(dataUser)
        let admin = await Administrador.create(dataAdmin);
        
        let findAdmin = await Usuario.findOne({
            where: {
                rut: user.rut
            },
            include: {
                model: Administrador,
                attributes: ['anios_experiencia']
            },
            attributes: {exclude: ['createdAt', 'updatedAt']}
            
        })

        res.send(findAdmin);
        return;

    }catch{
        return res.status(400).send({
            error: "Error al crear al administrador"})
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

//retornar los administradores, sus eventos

exports.obtenerAdminEventosTickets = async (req, res) => {
 
        Usuario.findAll({
            attributes: ['primer_nombre','primer_apellido','segundo_apellido'],
            include: [
                {
                    model: Administrador,
                    attributes: ['userRut'],
                    required: true,
                    include: [
                        {
                        model: Evento,
                        required: true,
                        attributes: ['nombre_evento', [Sequelize.fn('COUNT', Sequelize.col('eventNombreEvento')), 'cantidad_tickets']],
                        group: ['Ticket.eventNombreEvento'],
                        include: [
                            {
                                attributes: [], 
                                model: Ticket,
                            }
                        ],
                        
                        }
                    ],
                    
  
                }
            ],
            
        }).then(result => {
            res.send(result)
        }).catch(err => {
            res.status(400).send({
                message: "Error en la consulta",
            });
        })
};


