module.exports = (sequelize, Sequelize) => {
    const Administrator = sequelize.define("administrator", {
      anios_experiencia: {
        allowNull: true,
        defaultValue: 0,
        type: Sequelize.INTEGER,
      }
    });
  Administrator.removeAttribute('id');
  return Administrator;
  };
  