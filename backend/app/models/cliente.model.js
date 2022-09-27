module.exports = (sequelize, Sequelize) => {
    const Cliente = sequelize.define("client", {
      num_contacto: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      mail_contacto: {
        type: Sequelize.STRING(50),
        allowNull: false,
      }
    });
    Cliente.removeAttribute("id");
    return Cliente;
  };