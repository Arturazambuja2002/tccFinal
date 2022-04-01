'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

   await queryInterface.createTable('projetos', {
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
    custo: {
      type: Sequelize.DOUBLE,
      allowNull: false
    },
    categoria: {
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
    
    await queryInterface.dropTable('projetos');
     
  }
};


