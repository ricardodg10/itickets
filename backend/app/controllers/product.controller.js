// Importar dependencias
const db = require("../models");
const Product = db.products;
const Category = db.categories;
const Op = db.Sequelize.Op;
 
exports.create = (req, res) => {
    console.log(req.body)
    if (!req.body.name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    Category.findByPk(req.body.categoryId)
        .then(category => {
            if (category) {
                // categoria existe
                Product.create({
                        name: req.body.name,
                        description: req.body.description,
                        stock: req.body.stock,
                        categoryId: category.id
                    },{
                        include:[Category]
                    })
                    .then(product => {
                        res.send(product);
                    })
                    .catch(err => {
                        res.status(500).send({
                        message:
                            err.message || "Error al crear un producto"
                        });
                    });
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
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
    Product.findAll({
            where: condition,
            include: Category
        })
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
exports.findOne = (req, res) => {
    const id = req.params.id;
    Product.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `No se encontró el producto.`
                });
             }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error en la búsqueda"
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;
    Product.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Producto actualzado."
                });
            } else {
                res.send({
                    message: `No se pudo actualizar el producto`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error en actualización"
            });
        });
};
exports.delete = (req, res) => {
    const id = req.params.id;
    Product.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Producto eliminado"
                });
            } else {
                res.send({
                    message: `Producto no encontrado`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al eliminar el producto"
            });
        });
};
exports.deleteAll = (req, res) => {
    Product.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Productos eliminados!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Error al eliminar todos los productos."
            });
        });
};
