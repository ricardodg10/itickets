module.exports = (sequelize, Sequelize) => {
    const Event = sequelize.define("event", {
      nombre_evento: {
        allowNull: false,
        type: Sequelize.STRING(25),
        primaryKey: true,
      },
      tipo_evento: {
        allowNull: false,
        type: Sequelize.ENUM('Musical','Gastronomico')
      },
      direccion_evento: {
        allowNull: false,
        type: Sequelize.STRING(100),
      },
      ciudad_evento: {
        allowNull: false,
        type: Sequelize.STRING(25),
      },
      region_evento: {
        allowNull: false,
        type: Sequelize.STRING(25),
      },
      fecha_evento: {
        allowNull: false,
        type: Sequelize.DATEONLY,
      },
      hora_evento: {
        allowNull: false,
        type: Sequelize.TIME,
      },
      precio_evento: {
        allowNull: true,
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      descripcion_evento: {
        allowNull: false,
        type: Sequelize.STRING(1000),
      }
    });
    Event.removeAttribute('id');

    return Event;
  };
  