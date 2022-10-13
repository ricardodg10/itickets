module.exports = (sequelize, Sequelize) => {
    const Ticket = sequelize.define("ticket", {

    id_ticket:{ 
      type: Sequelize.INTEGER, 
      primaryKey: true, 
      autoIncrement: true}
    });
    
    Ticket.removeAttribute('id');
    return Ticket;
  };
  
