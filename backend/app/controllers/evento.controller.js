//se importan las dependencias
const { request } = require("express");
const db = require("../models");
const Ticket = db.ticket;
const Evento = db.evento;
const Usuario = db.usuario;
const Administrador = db.administrador;
const Op = db.Sequelize.Op;

exports.crearEvento = async (req, res) => {
    //validar el ingreso de todos los datos del evento
    if(!req.body.tipo || !req.body.nombre || !req.body.direccion || !req.body.ciudad || !req.body.region || !req.body.dia || !req.body.mes || !req.body.anio || !req.body.hora || !req.body.descripcion || !req.body.rutAdministrador || !req.body.cantidadDeTickets){
        res.status(400).send({
            message: "Debe rellenar todos los campos"
        });
        return;
    }

    //validar que el rut corresponda a un administrador y no exista un evento con el mismo nombre en la base de datos
    try{
        let user = await Usuario.findByPk(req.body.rutAdministrador)
        let adminUser = user.getAdministrator()
        if(!adminUser){
            res.status(404).send({
                message: "El rut ingresado no corresponde a un administrador."
            })
            return;
        }

        let event = await Evento.findOne({where: {nombre_evento: req.body.nombre}})
        if(event){
            res.send("El nombre del evento tiene que ser diferente a los nombres existentes.")
            return;
        }
    }catch{
        res.status(400).send({
            message: "Error. No se puede encontrar al administrador."
        })
        return;
    }

    dataEvento = {
        tipo_evento: req.body.tipo,
        nombre_evento: req.body.nombre,
        direccion_evento: req.body.direccion,
        ciudad_evento: req.body.ciudad,
        region_evento: req.body.region,
        dia_evento: req.body.dia,
        mes_evento: req.body.mes,
        anio_evento: req.body.anio,
        hora_evento: req.body.hora,
        precio_evento: req.body.precio,
        descripcion_evento: req.body.descripcion,
        administratorUserRut: req.body.rutAdministrador
    }

    try{
        let event = await Evento.create(dataEvento)

        dataTicket = {
            eventNombreEvento: req.body.nombre
        }

        for (let i = 0; i<req.body.cantidadDeTickets; i++){
            let ticket = await Ticket.create(dataTicket)
        }
        
        Evento.findOne({
            where: {
                nombre_evento: event.nombre_evento
            },
            attributes: {
                exclude: ['createdAt','updatedAt']
            },
            include: [
                {
                    model: Ticket,
                    attributes: ['id_ticket']
                }
            ]
        }).then(data=>{
            res.send(data)
        }).catch(err => {
            res.status(400).send({
                message: "Error en la consulta",
            });
        });
        
    }catch{
        res.status(400).send({
            message: "Error al crear el evento",
        });
    }
};

// eliminar un evento
exports.eliminarEvento = async (req, res) => {

    if(!req.body.rutAdministrador, !req.body.contrasenia, !req.body.nombreEvento){
        res.send('Debe rellenar los campos')
        return;
    }

    try{

        let admin = await Administrador.findByPk(req.body.rutAdministrador)

        if(!admin){
            res.status(404).send({
                message: `No se encontro al administrador con el rut`
            })
            return;
        }

        let adminEvent = await Evento.findOne({where: {administratorUserRut: admin.userRut}})

        if(!adminEvent){
            res.status(404).send({
                message: `El evento no pertenece al administrador, no se puede eliminar`
            })
            return;
        }

        let user = await Usuario.findByPk(req.body.rutAdministrador)

        if(user.contrasenia==req.body.contrasenia){
            try{
                let eliminar = await Evento.destroy({where: {nombre_evento: req.body.nombreEvento}})
                res.send('Evento eliminado')
                return;
            }catch{
                res.status(404).send({
                    message: `No se puede eliminar evento`
                });
                return;
            }
        }
    }catch{
        res.status(404).send({
            message: `Error en la consulta`,
        });
        return;
    }
};

exports.obtenerEventos = async (req, res) => {
    try{
        let events = await Evento.findAll({
            attributes: ['nombre_evento', 'tipo_evento', 'precio_evento', 'direccion_evento', 'region_evento', 'ciudad_evento', 'dia_evento', 'mes_evento', 'anio_evento', 'hora_evento']
        })
        res.send(events)
        return;
    }catch{
        res.status(400).send({
            message: "Error al obtener los eventos",
        });
        return;
    }
};

//buscar eventos con filtros obligatorios 
exports.buscarEvento = async (req, res) => {
    
    if(!req.body.tipo, !req.body.region){
        res.send('Debe rellenar los filtros obligatorios')
        return;
    }

    try{

        let event = await Evento.findAll({
            where: {tipo_evento: req.body.tipo, region_evento: req.body.region},
            attributes: {exclude: ['createdAt','updatedAt', 'administratorUserRut']}
        });
        
        if(!event){
            res.send('Evento no encontrado')
            return;
        }

        if(req.body.precioMaximo){
            event = await Evento.findAll({where: {
                precio_evento: {
                    [Op.lte]: req.body.precioMaximo
                }
            }})
        }

        if(req.body.numeroMes){
            event = await Evento.findAll({where: {
                    mes_evento: {
                        [Op.eq]: req.body.numeroMes
                    }
            }})
        }

        if(req.body.ciudad){
            event = await Evento.findAll({where: {
                ciudad_evento: req.body.ciudad
            }})
        }

        if(req.body.nombre){
            event = await Evento.findAll({where: {
                nombre_evento: {
                    [Op.like]: '%' + req.body.nombre + '%'
                }
            }})
        }

        res.send(event)
        return;

    }catch{
        res.status(404).send({
            message: `Error en la consulta`
        });
        return;
    }
}





    

