'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.createTable('contatos', { 
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
     email: {
       type: Sequelize.STRING,
       allowNull: false
     },
     mensagem: {
       type: Sequelize.TEXT,
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
    
     await queryInterface.dropTable('contatos');
  
  }
};