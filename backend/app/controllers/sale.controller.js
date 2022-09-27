// Importar dependencias
const db = require("../models");
const Sale = db.sales;
const Client = db.clients;
const Product = db.products;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    console.log(req.body)
    if (!req.body.clientId) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    promise = [
        Client.findByPk(req.body.clientId),
        Product.findByPk(req.body.productId)
    ]
    Promise.all(promise)
        .then(result => {
            console.log(req.body.number)
            Sale.create({
                    number: req.body.number,
                    clientId: result[0].id,
                    productId: result[1].id
                })
                .then(sale => {
                    res.send(sale);
                })
                .catch(err => {
                    res.status(500).send({
                    message:
                        err.message || "Error al crear un venta"
                    });
                });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error en la búsqueda"
            });
        });
};

exports.findAll = (req, res) => {
    Sale.findAll({ where: {} })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error en la búsqueda"
            });
        });
};
// Buscar una categoria por su id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Sale.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `No se encontró la categoria.`
                });
             }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error en la búsqueda"
            });
        });
};
// actualizar una categoria por su id
exports.update = (req, res) => {
    const id = req.params.id;
    Sale.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Categoria actualzada."
                });
            } else {
                res.send({
                    message: `No se pudo actualizar la categoria`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error en actualización"
            });
        });
};
// Eliminar un cliente
exports.delete = (req, res) => {
    const id = req.params.id;
    Sale.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Categoria eliminada"
                });
            } else {
                res.send({
                    message: `Categoria no encontrada`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al eliminar la categoria"
            });
        });
};
// eliminar a todos los clientes
exports.deleteAll = (req, res) => {
    Sale.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Categorias eliminadas!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Error al eliminar todas las categorias."
            });
        });
};
