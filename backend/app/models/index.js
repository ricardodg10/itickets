// Importe de dependencias
const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

// Inicialización de Sequelize
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});


const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Modelos importados a Sequelize
db.usuario = require("./usuario.model.js")(sequelize, Sequelize);
db.administrador = require("./administrador.model.js")(sequelize, Sequelize);
db.cliente = require("./cliente.model.js")(sequelize, Sequelize);
db.evento = require("./event.model.js")(sequelize, Sequelize);
db.ticket= require("./ticket.model.js")(sequelize, Sequelize);

//RELACIONES

//Usuario-Administrador 1:1 (Herencia)
db.usuario.hasOne(db.administrador, {
  foreignKey: {
    allowNull: false,
    primaryKey: true,
  }
});
db.administrador.belongsTo(db.usuario);

//Usuario-Cliente 1:1 (Herencia)
db.usuario.hasOne(db.cliente, {
  foreignKey: {
    allowNull: false,
    primaryKey: true
  }
});
db.cliente.belongsTo(db.usuario);

//Administrador-Evento 1:N
db.administrador.hasMany(db.evento, {
  foreignKey: {
    allowNull: false
  }
});
db.evento.belongsTo(db.administrador);

//Cliente-Ticket 1:N
db.cliente.hasMany(db.ticket, {
  foreignKey: {
    allowNull: true
  }
});
db.ticket.belongsTo(db.cliente);

//Evento-Ticket 1:N
db.evento.hasMany(db.ticket, {
  foreignKey: {
    allowNull: false
  }
});
db.ticket.belongsTo(db.evento);

module.exports = db;
