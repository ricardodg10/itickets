//se importan las dependencias
const { usuario } = require("../models");
const db = require("../models");
const Cliente = db.cliente;
const Ticket = db.ticket;
const Op = db.Sequelize.Op;

//asignar tickets un cliente
exports.asignarTicket = async (req, res) => {

    if(!req.body.rutCliente || !req.body.nombreEvento || !req.body.cantidadDeTickets){
        res.status(400).send({
            error: "Rellene todos los campos",
        });
        return ;
    }

    try{

        try{
            let client = await Cliente.findByPk(req.body.rutCliente)
            if(!client){
                res.send('El rut ingresado no corresponde a un cliente');
                return;
            }
        }catch{
            res.status(400).send({
                error: "Error al encontrar al cliente",
            });
            return ;
        }

        const ticketsDisponibles = await Ticket.count({
            where: {
                clientUserRut: null,
                eventNombreEvento: req.body.nombreEvento
            }
        })

        if(ticketsDisponibles>=Number(req.body.cantidadDeTickets)){
            try{
                for(let i=0; i<req.body.cantidadDeTickets; i++){
                    const ticket = await Ticket.findOne(
                        {where: {
                            clientUserRut: null,
                            eventNombreEvento: req.body.nombreEvento
                        }})

                    ticket.set({
                        clientUserRut : req.body.rutCliente
                    });
                    await ticket.save();
                }

                Cliente.findOne({
                    where: {
                        userRut: req.body.rutCliente
                    },
                    attributes: {
                        exclude: ['createdAt','updatedAt']
                    },
                    include: [
                        {
                            model: Ticket,
                            attributes: ['id_ticket', 'clientUserRut'],
                            where: {
                                eventNombreEvento: req.body.nombreEvento
                            }
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
                    message: "Error en la solicitud",
                });
                return;
            }  
        }else{
            res.send('La cantidad de tickets solicitados superan la cantidad disponibles para el evento')
            return;
        }

    }catch{
        res.status(400).send({
            message: "Error en la consulta",
        });
        return;
    }
};

//eliminar tabla ticket
exports.dropTicket = async(req, res) => {
    try{
        let drop = await queryInterface.dropTable('tickets');
        res.send('Tabla eliminada')
    }catch{
        res.status(400).send({
            message: "Error en la consulta",
        });
        return;
    }
}