'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

   await queryInterface.createTable('fundos', {
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
    valor: {
      type: Sequelize.DOUBLE,
      allowNull: false
    },
    descricao: {
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
    
    await queryInterface.dropTable('fundos');
     
  }
};


