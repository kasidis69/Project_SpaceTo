'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Workspace_equipments', {
      workspaceEquipmentNo: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      equipmentNameNo: {
        unique: true,
        type: Sequelize.INTEGER
      },
      workspaceNo: {
        unique: true,
        type: Sequelize.INTEGER
      },
      equipmentMaxMount: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Workspace_equipments');
  }
};