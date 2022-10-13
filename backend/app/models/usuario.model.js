module.exports = (sequelize, Sequelize) => {
    const Usuario = sequelize.define("user", {

      rut: {
        type: Sequelize.STRING(12),
        primaryKey: true,
        allowNull: false,
      },
      primer_nombre: {
        type: Sequelize.STRING(25),
        allowNull: false,
      },
      primer_apellido: {
        type: Sequelize.STRING(25),
        allowNull: false,
      },
      segundo_apellido: {
        type: Sequelize.STRING(25),
        allowNull: false,
      },
      contrasenia: {
        type: Sequelize.STRING(25),
        allowNull: false,
      }
    });
    Usuario.removeAttribute('id');
    return Usuario;
  };
  