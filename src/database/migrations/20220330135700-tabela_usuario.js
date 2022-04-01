'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.createTable('usuarios', { 
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      nome: {
       type: Sequelize.STRING,
       allowNull: false
     },
     cpf: {
       type: Sequelize.CHAR,
       allowNull:false
     },
     email: {
       type: Sequelize.STRING,
       allowNull: false
     },
     senha: {
       type: Sequelize.STRING,
       allowNull: false
     },
     createdAt: {
       type: Sequelize.DATE,
       allowNull: false
     },
     updatedAt: {
       type: Sequelize.DATE,
       allowNull: false
     },
    });
  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.dropTable('usuarios');
  
  }
};
